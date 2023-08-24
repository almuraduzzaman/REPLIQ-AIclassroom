import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment/moment";


const OrderList = () => {
    const [orderList, setOrderList] = useState();
    // console.log(orderList);

    useEffect(() => {
        axios.get('https://repliq-server-phi.vercel.app/orderList')
            .then(res => {
                setOrderList(res.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, [])




    return (
        <div className="w-[80%]">
            <Helmet>
                <title>Total Order | AI-classroom</title>
            </Helmet>

            <div className="flex justify-between bg-gray-200 rounded-lg px-6 py-3">
                <h3 className="text-3xl font-semibold">Total Order: {orderList?.length}</h3>
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course</th>
                            <th>Email</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user?.courseName}</td>
                                <td>{user?.email}</td>
                                <td>{moment(user?.date).format("MMM Do YY, h:mm:ss a")}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;