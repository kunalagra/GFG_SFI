import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { TbTrash } from 'react-icons/tb';
import { MdContentCopy } from 'react-icons/md';
import { Alert } from "@mui/material";

const MeetPage = () => {
  const apiRef = useRef();
  //eslint-disable-next-line
  const [logItems, updateLog] = useState([]);
  const [knockingParticipants, updateKnockingParticipants] = useState([]);
  const [searchparams] = useSearchParams();
  const meetId = searchparams.get("meetId");
//   const navigate = useNavigate();

    const isDoctor = true;
    const email = "abc@gmail.com";
    const phone = "1234567890";
    const [prescription, setPrescription] = useState([]);
    const [newPrescription, setNewPrescription] = useState([]);
    const [copyAlert, setCopyAlert] = useState(false);

  const printEventOutput = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {
      updateLog((items) => [...items, `${feature} off`]);
    } else {
      updateLog((items) => [...items, `${feature} on`]);
    }
  };

  const handleChatUpdates = (payload) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef.current.executeCommand("toggleChat");
    updateLog((items) => [
      ...items,
      `you have ${payload.unreadCount} unread messages`,
    ]);
  };

  const handleKnockingParticipant = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
    updateKnockingParticipants((participants) => [
      ...participants,
      payload?.participant,
    ]);
  };

  const resolveKnockingParticipants = (condition) => {
    knockingParticipants.forEach((participant) => {
      apiRef.current.executeCommand(
        "answerKnockingParticipant",
        participant?.id,
        condition(participant)
      );
      updateKnockingParticipants((participants) =>
        participants.filter((item) => item.id === participant.id)
      );
    });
  };

  const handleJitsiIFrameRef1 = (iframeRef) => {
    iframeRef.style.border = "10px solid #3d3d3d";
    iframeRef.style.background = "#3d3d3d";
    iframeRef.style.height = "400px";
    iframeRef.style.marginBottom = "20px";
  };

  const handleApiReady = (apiObj) => {
    apiRef.current = apiObj;
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
    apiRef.current.on("audioMuteStatusChanged", (payload) =>
      handleAudioStatusChange(payload, "audio")
    );
    apiRef.current.on("videoMuteStatusChanged", (payload) =>
      handleAudioStatusChange(payload, "video")
    );
    apiRef.current.on("raiseHandUpdated", printEventOutput);
    apiRef.current.on("titleViewChanged", printEventOutput);
    apiRef.current.on("chatUpdated", handleChatUpdates);
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
  };

  const handleReadyToClose = () => {
    console.log("Ready to close...");
  };

  const handleEndMeeting = () => {
    if (isDoctor === "doctor") {
    //   httpClint
    //     .get("/del-meet")
    //     .then((response) => {
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   navigate("/invoice");
    }
  };

  // const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;
  const generateRoomName = () => meetId;

  const renderButtons = () => (
    <div style={{ margin: "15px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          type="text"
          title="Click to execute toggle raise hand command"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#f8ae1a",
            color: "#040404",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() => apiRef.current.executeCommand("toggleRaiseHand")}
        >
          Raise hand
        </button>
        <button
          type="text"
          title="Click to approve/reject knocking participant"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#0056E0",
            color: "white",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() =>
            resolveKnockingParticipants(({ name }) => !name.includes("test"))
          }
        >
          Resolve lobby
        </button>
        <button
          type="text"
          title="Click to execute subject command"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#3D3D3D",
            color: "white",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() =>
            apiRef.current.executeCommand("subject", "New Subject")
          }
        >
          Change subject
        </button>
        <button
          type="text"
          title="Click to end the meeting"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#df486f",
            color: "white",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() => handleEndMeeting()}
        >
          End Meeting
        </button>
      </div>
    </div>
  );

  const renderSpinner = () => (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      Loading..
    </div>
  );

  const deletePrescriptionItem = (ind) => {
    setPrescription(prescription.filter(( _ ,index) => index!==ind));
  }

  const addPrescriptionItem = () => {
    setPrescription([...prescription, newPrescription]);
    setNewPrescription("");
  }

  const handleFormSubmit = () => {
    console.log(email, phone);
    console.log(prescription);
  };

  return (
    <div id="meet-page">
      <h2 className="meet-header">Video Meet {`(Meet ID: ${meetId})`} <span className="copy-icon" onClick={() => {
        setCopyAlert(true);
        navigator.clipboard.writeText(`https://meet.jit.si/${meetId}`);
        setTimeout(() => setCopyAlert(false), 2000);
      }}>
        <MdContentCopy />
        { copyAlert && (
          <div className="copy-alert">
            <Alert severity="success">Copied</Alert>
          </div>
        )}
        </span>
      </h2>
      <div className="jitsi-component-div">
        <JitsiMeeting
            // domain="http://localhost:8000/"
            roomName={generateRoomName()}
            spinner={renderSpinner}
            configOverwrite={{
              subject: "XYZ",
              hideConferenceSubject: false,
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: true,
              enableEmailInStats: false
            }}
            onApiReady={(externalApi) => handleApiReady(externalApi)}
            onReadyToClose={handleReadyToClose}
            getIFrameRef={handleJitsiIFrameRef1}
            interfaceConfigOverwrite = {{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo = {{
                displayName: 'ABCD'
            }}
        />
      </div>

      {renderButtons()}

      {isDoctor && (

        <div className="doctor-prescription">
            <h2 className="prescription-header">Prescription</h2>

            {  prescription.length > 0 && (
                <div className="prescription-items">
                    { prescription.map((item, index) => (
                        <div className="item" key={index}>
                            <div className="prescription">
                                <p>{item}</p>
                                <div className="tooltip">{item}</div>
                            </div>
                            <div className="delete-item">
                                <span onClick={() => {deletePrescriptionItem(index)}}>
                                    <TbTrash />
                                </span>
                                <div className="tooltip">Remove Item</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="new_prescription">
                <div className="input_box">
                    <input
                        type="text"
                        className="input_field"
                        value={newPrescription}
                        onChange={(e) => setNewPrescription(e.target.value)}
                        placeholder="Add Something..."
                        required
                    />
                </div>
                <button onClick={addPrescriptionItem} disabled={newPrescription.length===0}>
                    Add
                </button>
            </div>
            <div className="send-prescription">
                <button className="send-btn" onClick={handleFormSubmit}>Send</button>
            </div>
        </div>

      )}
    </div>
  );
};

export default MeetPage;