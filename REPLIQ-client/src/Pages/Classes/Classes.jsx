import { useEffect, useState } from "react";
import ClassesCard from "./ClassesCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { BsCardList, BsLayoutThreeColumns } from "react-icons/bs";
import ClassesList from "./ClassesList";
import Modal from "../../components/Modal/Modal";
import { motion } from 'framer-motion';
import axios from "axios";

const Classes = () => {

    const [classes, setClasses] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [changeLayout, setChangeLayout] = useState(true);
    const [exploreOtherCourses, SetExploreOtherCourses] = useState(true);
    // console.log(classes);


    useEffect(() => {
        axios.get('http://localhost:5000/courses')
            .then(res => {
                setClasses(res.data);
                setLoadingData(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                setLoadingData(false);
            });
    }, [exploreOtherCourses])


    const handleSearch = () => {
        if (searchText == '') {
            SetExploreOtherCourses(!exploreOtherCourses);
            return
        }

        axios.get(`http://localhost:5000/getCourseByName/${searchText}`)
            .then((res) => {
                setClasses(res.data);
                setLoadingData(false);

                // Clearing the input field directly
                const inputElement = document.querySelector("input[name='search']");
                if (inputElement) {
                    inputElement.value = '';
                }
            });
    };


    if (loadingData) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Helmet>
                <title>Classes | AI-classroom</title>
            </Helmet>

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
            <Modal/>

            <SectionTitle heading={'Browse All Courses'} subHeading={'Discover a wide range of programming language courses for all skill levels'} />

            {/* search field section  */}
            <div className="flex items-center justify-around px-6 md:px-32">
                <div className="input-group">
                    <input name="search" onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search by Classes..." className="input input-bordered" />
                    <button onClick={handleSearch} className="btn btn-square bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 border-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>

                <div className="flex items-center gap-4 text-lg">
                    <BsCardList onClick={() => setChangeLayout()} className="text-2xl cursor-pointer  hover:scale-110" />
                    <BsLayoutThreeColumns onClick={() => setChangeLayout(true)} className="text-xl cursor-pointer hover:scale-110" />
                </div>

            </div>

            {
                classes.length == 0 ?
                    <div className="flex flex-col text-center items-center justify-center h-[300px]">
                        <p className="text-3xl font-bold text-gray-500 mb-10">No course found with the name '{searchText}'!</p>
                        <button
                            onClick={() => SetExploreOtherCourses(!exploreOtherCourses)}
                            className=" cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 text-base btn border-0"
                        >
                            Explore other courses
                        </button>
                    </div> : <div>
                        {
                            changeLayout ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-16 lg:mx-24 mt-10">{classes.map(classObj => <ClassesCard key={classObj._id} classObj={classObj}  setClasses={setClasses}/>)}</div>
                            ) : (
                                <ClassesList classes={classes} setClasses={setClasses} />
                            )
                        }
                    </div>
            }

        </>
    );
};

export default Classes;