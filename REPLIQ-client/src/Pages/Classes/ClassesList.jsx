import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsEyeFill, BsFillCartCheckFill, BsFillTrashFill } from "react-icons/bs";
import useAdmin from "../../Hooks/useAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useSelectedClasses from "../../Hooks/useSelectedClasses";


const ClassesList = ({ classes, setClasses }) => {
    // console.log(classes);
    const [isAdmin] = useAdmin();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedClasses, refetch] = useSelectedClasses();

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
                            setClasses(classes => classes.filter(cls => cls._id !== id));
                        }
                    })
            }
        })
    }


    const handleAddToCart = (course) => {
        // console.log(item);
        if (user && user.email) {
            const cartItem = { courseId: course._id, courseName: course.title, courseImage: course.img, email: user.email, date: new Date() };

            const isCourseInCart = selectedClasses.some(item => item.courseId === course._id);

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
        <div className="overflow-x-auto md:flex justify-center my-10">
            <table className="table table-zebra table-compact w-[80%]">
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Class</th>
                        <th>Description</th>
                        <th>Learn More</th>
                        <th>{isAdmin ? 'Delete' : 'Enroll'}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes && classes.map((singleClass, idx) => {
                            return (
                                <tr key={singleClass._id}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={singleClass?.img} alt="singleClass image" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-normal font-semibold">{singleClass?.title}</td>
                                    <td>{singleClass?.overview}</td>
                                    <td ><Link to={`/classes/${singleClass._id}`}
                                        className="btn btn-outline rounded-md text-xl"
                                    >
                                        <BsEyeFill />
                                    </Link></td>

                                    <td>
                                        {
                                            isAdmin ? <button
                                                onClick={() => handleDeleteClass(singleClass._id)}
                                                className="btn cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 text-xl"
                                            >
                                                <BsFillTrashFill />
                                            </button> : <button
                                                onClick={() => handleAddToCart(singleClass)}
                                                className="btn cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 text-xl"
                                            >
                                                <BsFillCartCheckFill />
                                            </button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ClassesList;