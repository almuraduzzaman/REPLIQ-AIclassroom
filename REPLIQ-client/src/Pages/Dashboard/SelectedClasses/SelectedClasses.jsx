import Swal from "sweetalert2";
import useSelectedClasses from "../../../Hooks/useSelectedClasses";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";



const SelectedClasses = () => {
    const [selectedClasses, refetch] = useSelectedClasses();
    // console.log(selectedClasses);

    const handleDelete = id => {
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
                axios.delete(`http://localhost:5000/selectedClasses/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Successfully deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }


    return (
        <>
            <Helmet>
                <title>Selected Classes | AI-classroom</title>
            </Helmet>
            <h3 className="text-3xl font-semibold my-4 bg-gray-200 rounded-lg px-6 py-3">Selected Classes: {selectedClasses.length}</h3>
            <div className="overflow-x-auto md:w-1/2">
                <table className="table table-zebra ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClasses && selectedClasses.map((selectedClass, index) => <tr key={selectedClass._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={selectedClass.courseImage} />
                                        </div>
                                    </div>
                                </td>
                                <td>{selectedClass.courseName}</td>
                                <td className="text-end">${selectedClass.price}</td>
                                <td>
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => handleDelete(selectedClass._id)}
                                            className="p-2 cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 text-xl"
                                        >
                                            <BsFillTrashFill />
                                        </button>
                                        <Link to={'/dashboard/payment-history'}><button className="btn btn-outline btn-sm">Pay</button></Link>
                                    </div>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SelectedClasses;