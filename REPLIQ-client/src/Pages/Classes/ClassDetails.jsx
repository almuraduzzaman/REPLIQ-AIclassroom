import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
import useSelectedClasses from "../../Hooks/useSelectedClasses";
import axios from "axios";
import Swal from "sweetalert2";

const ClassDetails = () => {
    const singleClass = useLoaderData();
    const [isAdmin] = useAdmin();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedClasses, refetch] = useSelectedClasses();
    const { _id, title, img, overview, Curriculum, Training_program_benefits, Tutors, duration } = singleClass[0] || {};
    // console.log(singleClass);

    const handleAddToCart = () => {
        // console.log(item);
        if (user && user.email) {
            const cartItem = { courseId: _id, courseName: title, courseImage: img, email: user.email, date: new Date() };

            const isCourseInCart = selectedClasses.some(item => item.courseId === _id);

            if (isCourseInCart) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'Course is already in the cart.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                axios.post('http://localhost:5000/selectedClasses', cartItem)
                    .then(res => {
                        if (res.data.insertedId) {
                            refetch();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Course added on the cart.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
            }

        }
        else {
            Swal.fire({
                title: 'Please login to enroll in the course!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#538EC8',
                cancelButtonColor: '#4c77a1',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <>
            <Helmet>
                <title>Class Details | AI-classroom</title>
            </Helmet>

            <section className="lg:px-24 text-gray-600 px-6 md:px-0">
                <SectionTitle heading={title} />
                <div className="md:flex gap-6 md:px-6 justify-between items-center ">
                    <div className="relative">
                        <img className="lg:h-[400px] h-64 object-cover object-center bg-gray-200 p-4 border-4 rounded-xl" src={img} />
                        <p className=" text-gray-500 font-medium text-sm">Instructors: {Tutors}</p>
                        <p className="badge badge-ghost absolute top-6 left-6"><BiTime className="mr-2" />{duration}</p>
                    </div>

                    <div className="md:w-1/2 mt-10 md:mt-0">
                        <h6 className="font-semibold">Course Summery</h6>
                        <div className="flex items-center border-b-2 border-gray-200 mb-5"></div>
                        <p className="mb-4">{overview}</p>

                        <h6 className="font-semibold">Training program benefits</h6>
                        <div className="flex items-center border-b-2 border-gray-200 mb-5"></div>
                        {
                            Training_program_benefits && Training_program_benefits.map((benefit, idx) => <ul className="text-gray-500" key={idx}>
                                <li className="mb-2">{idx + 1}. {benefit}</li>
                            </ul>)
                        }

                    </div>
                </div>

                <div className="flex justify-center">

                    {
                        isAdmin ? <button
                            className="md:w-1/4 cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 mt-10 text-base btn border-0"
                        >
                            <span>Update</span>
                            <FiEdit />
                        </button> : <button
                            onClick={handleAddToCart}
                            className="md:w-1/4 cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 mt-10 text-base btn border-0">
                            <span>Enroll Now</span><BsFillArrowRightCircleFill />
                        </button>
                    }
                </div>


                {/* accordion  */}
                <div className="m-20 md:w-2/3 mx-auto">
                    <p className="text-gray-600 text-3xl  font-bold mb-1 text-center">Course Content</p>

                    <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>


                    {Curriculum.map((content, idx) => (
                        <div key={idx} className="collapse collapse-arrow bg-base-200 mb-4">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-lg font-semibold bg-base-200">
                                {content.split('\n')[0]}
                            </div>
                            <div className="collapse-content">
                                {
                                    content.split('\n').map((topic, idx) => {
                                        if (idx > 1) {
                                            return (
                                                <ul className="list-disc pl-4" key={idx}>
                                                    <li className="mb-4">{topic}</li>
                                                </ul>
                                            );
                                        }
                                        return null;
                                    })
                                }
                            </div>

                        </div>
                    ))}

                </div>
            </section >
        </>
    );
};

export default ClassDetails;