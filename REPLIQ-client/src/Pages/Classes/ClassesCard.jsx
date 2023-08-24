import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillArrowRightCircleFill, BsFillTrashFill } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import useAdmin from "../../Hooks/useAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useSelectedClasses from "../../Hooks/useSelectedClasses";


const ClassesCard = ({ classObj, setClasses }) => {
    const { _id, title, img, overview } = classObj;
    // console.log(classObj);
    const [isAdmin] = useAdmin();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedClasses, refetch] = useSelectedClasses();

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

    const handleDeleteClass = id => {
        // console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#538EC8',
            cancelButtonColor: '#4c77a1',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/deleteClasses/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Successfully deleted.',
                                'success'
                            )
                            setClasses(classObj => classObj.filter(cls => cls._id !== id));
                        }
                    })
            }
        })
    }


    return (
        <section key={classObj._id} className="text-gray-600 bg-gray-100 mb-10 md:mb-16 shadow-md rounded-lg flex flex-col">
            <div className='p-6 flex-grow flex flex-col justify-between'>
                <div>
                    <img className="rounded w-full object-cover object-center mb-3" src={img} alt={title} style={{ height: '200px' }} />

                    <div className="flex justify-between text-xs text-gray-500">
                        <div className=" flex items-center gap-2 px-1 border-2 rounded-xl"><BiTime />{classObj.duration}</div>
                        <div className="px-1 border-2 rounded-xl">{classObj.domain}</div>
                    </div>

                    <h2 className="text-lg text-[#538EC8] font-medium title-font mt-2">{title}</h2>
                    <h3 className="tracking-widest text-gray-500 text-xs font-medium title-font mb-4">{overview}</h3>
                </div>

                <div className="flex justify-between">
                    <Link to={`/classes/${_id}`}
                        className="flex cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 mt-2 text-base font-light btn btn-sm border-0">
                        Learn More
                    </Link>

                    {
                        isAdmin ? <button
                            onClick={() => handleDeleteClass(_id)}
                            className="flex gap-4 cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 mt-2 text-base font-light btn btn-sm border-0"
                        >
                            <span>Delete</span>
                            <BsFillTrashFill />
                        </button> : <button
                            onClick={handleAddToCart}
                            className="flex gap-4 cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 mt-2 text-base font-light btn btn-sm border-0">
                            <span>Enroll</span><BsFillArrowRightCircleFill />
                        </button>
                    }


                </div>
            </div>
        </section>

    );
};

export default ClassesCard;