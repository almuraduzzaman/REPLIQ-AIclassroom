import axios from 'axios';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ClassesList from '../../Classes/ClassesList';
import { Link } from 'react-router-dom';

const AllCourses = () => {
    const [classes, setClasses] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [searchText, setSearchText] = useState('');
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
                <title>All Classes | AI-classroom</title>
            </Helmet>

            <div className='w-[60%]'>
                <SectionTitle heading={'All Classes'} subHeading={`Total Classes: ${classes.length}`} />
            </div>

            {/* search field section  */}
            <div className="flex items-center justify-between px-6 w-[80%]">
                <div className="input-group">
                    <input name="search" onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search by class name..." className="input input-bordered" />
                    <button onClick={handleSearch} className="btn btn-square bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 border-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>

                <div>
                    <Link to={'/dashboard/manage-classes/add-class'} className="text-white cursor-pointer px-3 py-2 rounded-lg bg-[#538EC8] hover:bg-[#4c77a1]"><button>Add Class</button></Link>
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
                    </div> : <ClassesList classes={classes} setClasses={setClasses}/>
            }

        </>
    );
};

export default AllCourses;