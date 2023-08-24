import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    });

    const handleDeleteUser = id => {
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
                axios.delete(`https://repliq-server-phi.vercel.app/deleteUsers/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Successfully deleted.',
                                'success'
                            )
                            refetch();
                        }
                    })
            }
        })
    }

    if (isLoading) {
        return <LoadingSpinner />
    }


    return (
        <div className="w-[80%]">
            <Helmet>
                <title>All Users | AI-classroom</title>
            </Helmet>

            <div className="flex justify-between bg-gray-200 rounded-lg px-6 py-3">
                <h3 className="text-3xl font-semibold">Total Users: {users.length}</h3>
                <Link to={'/dashboard/manage-users/add-user'} className="text-white cursor-pointer px-3 py-2 rounded-lg bg-[#538EC8] hover:bg-[#4c77a1]"><button>Add User</button></Link>
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="capitalize ">{user?.role ? user.role : 'student'}</td>
                                <td>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="btn cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] text-gray-100 text-xl"
                                        >
                                            <BsFillTrashFill />
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;