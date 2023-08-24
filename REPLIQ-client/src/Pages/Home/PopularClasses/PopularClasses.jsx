import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { BiTime } from "react-icons/bi";
import axios from 'axios';


const PopularClasses = () => {
    const [classes, setClasses] = useState([]);
    // console.log(classes);
    useEffect(() => {
        axios.get('http://localhost:5000/popularCourses')
            .then(res => setClasses(res.data))
            .catch(err => console.log(err.message))
    }, [])

    return (
        <>
            <SectionTitle heading={'Featured Courses'} subHeading={'Explore our most popular programming language courses'} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-16 lg:mx-24">
                {classes.map((classObj) => (
                    <section key={classObj._id} className="text-gray-600 shadow-md rounded-lg bg-gray-100 flex flex-col">
                        <div className="p-4 flex-grow">
                            <img className="h-40 rounded w-full object-cover object-center mb-6" src={classObj.img} alt="class" />
                            <h2 className="text-lg text-[#538EC8] font-medium title-font">{classObj.title}</h2>
                            <h3 className="tracking-widest text-gray-500 text-xs font-medium title-font">{classObj.overview}</h3>
                        </div>
                        <div className="flex justify-between p-4">
                            <div className="badge badge-outline"><BiTime className="mr-2" />{classObj.duration}</div>
                            <div className="badge badge-outline">{classObj.domain}</div>
                        </div>
                    </section>
                ))}
            </div>

            <div className="flex justify-center m-20">
                <Link to={'/classes'}
                    className="md:w-1/4 cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 text-base btn border-0"
                >
                    See More
                </Link>
            </div>
        </>
    );
};

export default PopularClasses;