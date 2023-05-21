import React from "react";
import useDocTitle from "../hooks/useDocTitle";
import { MdAccountCircle } from "react-icons/md";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from 'react-icons/md';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { IoMdMail } from "react-icons/io";


const LandingPage = () => {

    useDocTitle();

    const faqs = [
        {
            question: "What is Medicall?",
            answer: "It is the web application that connects patients to the right doctor or allow them to choose a doctor as per their need. It provides information about users, doctors, news, appointments, and prescriptions. It also allows users to create instant meetings with doctors, and buy medicines. It allows users to check their health status by using his/her symptoms."
        },
        {
            question: "Can we get a free account in Medicall and use all its features for free?",
            answer: "Yes, Ofcourse. You can use all the features provided by Medicall for free."
        },
        {
            question: "Can we book an appointment at any time?",
            answer: "Yes. You can book an appointment of a doctor if he/she is free at that time."
        },
        {
            question: "Is there a way to test our health?",
            answer: "Yes. You can test your health by a Model that predicts the disease probability in the future."
        },
        {
            question: "Can we purchase the medicines from here?",
            answer: "Yes. You can purchase the medicines from Medicall store."
        },
    ];
    
    return (
        <div id="landing-page">
            <section className="intro-section">
                <div className="bg"></div>
                <div className="content">
                    <h2>MEDICALL</h2>
                    <p>Let's cure lives together</p>
                </div>
            </section>

            <section className="features-section">
                <div><h2>Our Features</h2></div>
                <div className="features">
                    <div className="item">
                        <h3>Live Video Calls</h3>
                        <p>Live Video Call between doctor and patient and generating prescriptions.</p>
                    </div>
                    <div className="item">
                        <h3>Disease Identification model</h3>
                        <p>You can test your health whether you have a possibility of disease or not.</p>
                    </div>
                    <div className="item">
                        <h3>Pharmacy integrated with stripe</h3>
                        <p>You can purchase medicines through our pharmacy store with stripe secured payments.</p>
                    </div>
                </div>

            </section>

            <section className="need-section">
                <div className="qn">
                    <h2>Why do we need?</h2>
                </div>
                <div className="ans">
                    <ul>
                        <li>WHO recommends 44.5 doctors per 10,000 people but India has only 22 per 10k people so major supply demand mismatchIndia has 22.8 doctors for every 10K citizens, the half of what WHO recommends.</li>
                        <li>Also, local doctors may fail to provide  the best consultation as they lack expertise & experience.</li>
                        <li>Thus all-in-one online hospital was created. It offers a disease prediction system, pharmacy, and payments.</li>
                        <li>This platform provides access to quality healthcare from anywhere, improving healthcare outcomes and accessibility.</li>
                    </ul>
                </div>
            </section>

            <section className="benefits-section">
                <div className="main">
                    <h2>Benefits</h2>
                    <div className="first">TeleHealth services</div>
                    <div className="second">Convenience and accessibility</div>
                    <div className="third">Online Appointment Booking</div>
                    <div className="fourth">Competitive advantage</div>
                </div>
            </section>

            <section className="faq-section">
                <h2 className="head">Frequently Asked Questions</h2>
                <div className="faqs">
                    {faqs.map((item, index) => (
                        <Accordion key={index} className="faq-item">
                            <AccordionSummary
                                expandIcon={<MdExpandMore />}
                                className="expand-icon"
                            >
                            <div className="item-qn">{item.question}</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="item-ans">{item.answer}</div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </section>

            <section className="team-section">
                <div className="head"><h2>Our Team</h2></div>
                <div className="team">
                    <div className="item">
                        <MdAccountCircle className="img"/>
                        <h3>Kunal Agrawal</h3>
                        <div className="contact-div">
                            <div className="contact-icon"><IoMdMail /></div>
                            <div className="contact-icon"><AiFillGithub /></div>
                            <div className="contact-icon"><AiFillLinkedin /></div>
                        </div>
                    </div>
                    <div className="item">
                        <MdAccountCircle className="img" />
                        <h3>Ganesh Utla</h3>
                        <div className="contact-div">
                            <div className="contact-icon"><IoMdMail /></div>
                            <div className="contact-icon"><AiFillGithub /></div>
                            <div className="contact-icon"><AiFillLinkedin /></div>
                        </div>
                    </div>
                    <div className="item">
                        <MdAccountCircle className="img" />
                        <h3>Deexith Madas</h3>
                        <div className="contact-div">
                            <div className="contact-icon"><IoMdMail /></div>
                            <div className="contact-icon"><AiFillGithub /></div>
                            <div className="contact-icon"><AiFillLinkedin /></div>
                        </div>
                    </div>
                    <div className="item">
                        <MdAccountCircle className="img" />
                        <h3>Aman Tiwari</h3>
                        <div className="contact-div">
                            <div className="contact-icon"><IoMdMail /></div>
                            <div className="contact-icon"><AiFillGithub /></div>
                            <div className="contact-icon"><AiFillLinkedin /></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage;