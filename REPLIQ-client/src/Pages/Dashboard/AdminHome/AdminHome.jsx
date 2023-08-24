import { Helmet } from "react-helmet-async";
import useAdmin from "../../../Hooks/useAdmin";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const AdminHome = () => {
    const [isAdmin] = useAdmin();
    const { user } = useAuth();
    const [totalClass, setTotalClass] = useState([]);
    const [totalOrder, setTotalOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [axiosSecure] = useAxiosSecure();


    useEffect(() => {
        axios.get('https://repliq-server-phi.vercel.app/courses')
            .then(res => {
                setTotalClass(res.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });

        axios.get('https://repliq-server-phi.vercel.app/orderList')
            .then(res => {
                setTotalOrder(res.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    const { data: users = [], isLoading: isUsersLoading } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    });


    return (
        <section className="text-neutral-700 w-2/3">
            <Helmet>
                <title>Admin Home | AI-classroom</title>
            </Helmet>


            {
                isAdmin ? <SectionTitle heading={'Efficient Admin Dashboard'} /> :
                    <SectionTitle heading={'Personalized User Dashboard'} subHeading={'Streamline Operations and Enhance Language Learning Management'} />
            }

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                <div className="p-6 bg-slate-300 rounded-md flex flex-col items-center justify-center">
                    <h6 className="text-slate-500 text-lg font-bold">Total Classes</h6>
                    <p className="text-xl md:text-4xl text-slate-600 font-bold">{isLoading ? <span className="text-xl">Loading...</span> : totalClass?.length}</p>
                </div>
                <div className="p-6 bg-slate-300 rounded-md flex flex-col items-center justify-center">
                    <h6 className="text-slate-500 text-lg font-bold">Total Users</h6>
                    <p className="text-xl md:text-4xl text-slate-600 font-bold">{isUsersLoading ? <span className="text-xl">Loading...</span> : users?.length}</p>
                </div>
                <div className="p-6 bg-slate-300 rounded-md flex flex-col items-center justify-center">
                    <h6 className="text-slate-500 text-lg font-bold">Total Order</h6>
                    <p className="text-xl md:text-4xl text-slate-600 font-bold">{isLoading ? <span className="text-xl">Loading...</span> : totalOrder?.length}</p>
                </div>
            </div>


            <div className=" text-center mx-auto">
                <div>
                    <div
                        className="block rounded-lg bg-white shadow-lg">
                        <div className="h-28 overflow-hidden rounded-t-lg bg-[#4c77a1]"></div>
                        <div
                            className="mx-auto -mt-12 w-24 h-24 overflow-hidden rounded-full border-2 border-white bg-white">
                            <img
                                src={user.photoURL} />
                        </div>
                        <div className="p-6">
                            <h4 className="mb-4 text-2xl font-semibold">{user.displayName}</h4>
                            <p style={{ wordWrap: 'break-word', maxWidth: '100%' }} className="mb-4 text-xl">{user.email}</p>
                            <hr />
                            <p className="mt-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="inline-block h-7 w-7 pr-2"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                </svg>
                                {
                                    isAdmin ? <span>Behind every successful language learning experience, there is a dedicated admin team ensuring seamless operations and a smooth learning environment.</span>
                                        :
                                        <span> Language learning is a key that unlocks a world of possibilities, empowering you to communicate, connect, and thrive in diverse global communities.</span>
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminHome;