import Banner from "../Home/Banner/Banner";
import img1 from '../../../src/assets/banner/1.jpg';
import img2 from '../../../src/assets/banner/2.jpg';
import img3 from '../../../src/assets/banner/3.jpg';
import img4 from '../../../src/assets/banner/4.jpg';
import img5 from '../../../src/assets/banner/5.jpg';
import img6 from '../../../src/assets/banner/6.jpg';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaGlobe, FaCertificate, FaBuilding, FaSuitcase, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Services = () => {
    const listItems = [
        { id: 0, text: "Online Training" },
        { id: 1, text: "Offline Training" },
        { id: 2, text: "Job Assistance" },
        { id: 3, text: "Internship" },
        { id: 4, text: "Project Mentorship" },
        { id: 5, text: "Certification" },
    ];

    const listImages = [
        { img: img1, alt: "Online Training" },
        { img: img2, alt: "Offline Training" },
        { img: img3, alt: "Job Assistance" },
        { img: img4, alt: "Internship" },
        { img: img5, alt: "Project Mentorship" },
        { img: img6, alt: "Certification" },
    ];

    return (
        <>
            <Helmet>
                <title>Services | AI-classroom</title>
            </Helmet>

            <Banner listItems={listItems} listImages={listImages} />

            <div className="bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC] border-y-4 border-white">
                <VerticalTimeline
                    animate={true}>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date="Empowerment Beyond Borders"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<FaGlobe />}
                    >
                        <h3 className="vertical-timeline-element-title">Online Training</h3>
                        <p>
                            Unlock your AI potential from anywhere with our comprehensive online training programs. Gain valuable skills and knowledge to thrive in the world of artificial intelligence, all from the comfort of your own space.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentArrowStyle={{ borderRight: '7px solid  rgb(16, 204, 82)' }}
                        date="Hands-On Learning"
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                        icon={<FaBuilding />}
                    >
                        <h3 className="vertical-timeline-element-title">Offline Training</h3>
                        <p>
                            Immerse yourself in practical AI education through our offline training sessions. Join us at our state-of-the-art facilities to receive expert guidance and personalized attention from our experienced instructors.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date="Career Catalyst"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<FaSuitcase />}
                    >
                        <h3 className="vertical-timeline-element-title">Job Assistance</h3>
                        <p>
                            Get a head start in your AI career with our job assistance services. We connect you with industry partners and help you secure rewarding opportunities, leveraging your AI expertise to achieve professional success.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentArrowStyle={{ borderRight: '7px solid  rgb(16, 204, 82)' }}
                        date="Real-World Exposure"
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                        icon={<FaUserGraduate />}
                    >
                        <h3 className="vertical-timeline-element-title">Internship</h3>
                        <p>
                            Gain invaluable experience with our AI internships. Work on cutting-edge projects, collaborate with industry professionals, and enhance your skills to stand out in the competitive AI landscape.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date="Guidance to Greatness"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<FaChalkboardTeacher />}
                    >
                        <h3 className="vertical-timeline-element-title">Project Mentorship</h3>
                        <p>
                            Elevate your projects to new heights with our project mentorship program. Benefit from one-on-one guidance from our seasoned mentors, ensuring your AI projects reach their full potential.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentArrowStyle={{ borderRight: '7px solid  rgb(16, 204, 82)' }}
                        date="Recognized Expertise"
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                        icon={<FaCertificate />}
                    >
                        <h3 className="vertical-timeline-element-title">Certification</h3>
                        <p>
                            Earn industry-recognized certifications upon completing our AI courses. Showcase your expertise and enhance your credibility as a skilled AI professional in the job market.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </>
    );
};

export default Services;