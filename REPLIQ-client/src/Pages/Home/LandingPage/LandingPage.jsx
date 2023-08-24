import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import Modal from "../../../components/Modal/Modal";
import { motion } from 'framer-motion';
import img1 from '../../../assets/banner/py.png'
import img2 from '../../../assets/banner/stat.jpg'
import img3 from '../../../assets/banner/ml.jpg'
import img4 from '../../../assets/banner/nlp.jpg'
import img5 from '../../../assets/banner/big_data.jpg'
import ExperiencedInstructor from "../ExperiencedInstructor/ExperiencedInstructor";

const LandingPage = () => {
    const listItems = [
        { id: 0, text: "Python Programming" },
        { id: 1, text: "Statistics and Algebra" },
        { id: 2, text: "Machine and Deep Learning" },
        { id: 3, text: "NLP and Computer Vision" },
        { id: 4, text: "Big Data and IoT" }
    ];

    const listImages = [
        { img: img1, alt: "Python Programming" },
        { img: img2, alt: "Statistics and Algebra" },
        { img: img3, alt: "Machine and Deep Learning" },
        { img: img4, alt: "NLP and Computer Vision" },
        { img: img5, alt: "Big Data and IoT" }
    ];

    return (
        <>
            <Helmet>
                <title>Home | AI-classroom</title>
            </Helmet>

            <Banner listItems={listItems} listImages={listImages} />
            <ExperiencedInstructor />
            <PopularClasses />

            {/* Modal component and motion button */}
            <motion.button
                animate={{
                    scale: [1, 1.1, 1], // Scale animation from 1 to 1.1 and back to 1
                }}
                transition={{
                    duration: 2, // Animation duration in seconds
                    repeat: Infinity, // Repeat the animation infinitely
                    repeatType: 'reverse', // Reverse the animation direction after each repeat
                }}
                className="bg-[#4da6ff] hover:bg-[#4da6ffd4] px-3 py-2 rounded-2xl font-bold text-gray-100 fixed bottom-5 right-5 z-50" onClick={() => window.my_modal_3.showModal()}>
                Contact Us
            </motion.button>
            <Modal />
        </>
    );
};

export default LandingPage;