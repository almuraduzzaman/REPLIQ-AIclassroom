import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import PhoneInput from "react-phone-input-2";


const AddAUser = () => {
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);

        setError('')

        const saveUser = { name: data.name, email: data.email, phone: data.phone, role: 'user' }
        axios.post('http://localhost:5000/users', saveUser)
            .then(res => {
                // console.log(res);
                if (res?.data?.insertedId) {
                    Swal.fire(
                        {
                            text: 'User Added Successfully',
                            icon: 'success',
                            confirmButtonText: 'Continue',
                            confirmButtonColor: '#538EC8'
                        }
                    );
                    reset();
                }
            })
            .catch(err => setError(err.message))
    };

    return (
        <div className="h-full bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC] w-full py-16">
            <Helmet>
                <title>Add User | AIClassroom</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded  md:w-1/2 w-full p-10">
                    <p tabIndex={0} className="text-2xl font-extrabold leading-6 text-gray-800 mb-4">
                        Add a new user
                    </p>

                    <div>
                        <label className="text-sm font-medium leading-none text-gray-800">Name</label>
                        <input {...register("name", { required: true })} type="text" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                        {errors.name?.type === 'required' && <p>Name is required</p>}
                    </div>

                    <div className="mt-6 w-full">
                        <label className="text-sm font-medium leading-none text-gray-800">Email</label>
                        <input {...register("email", { required: true })} type="email" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                        {errors.email?.type === 'required' && <p>Email is required</p>}
                    </div>

                    <div className="mt-6 w-full">
                        <label className="text-sm font-medium leading-none text-gray-800">Phone</label>
                        <Controller
                            name="phone"
                            type="number"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <PhoneInput
                                    {...field}
                                    country={'bd'}
                                    autoFormat={false}
                                    placeholder="Phone No.*"
                                    inputClass="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    containerClass=""
                                    dropdownClass=""
                                    inputStyle={{ height: "100%", width: "100%", backgroundColor: "#e5e7eb", border: "none" }}
                                />
                            )}
                        />
                        {errors.phone?.type === 'required' && <p>Phone is required</p>}
                    </div>


                    <div className="mt-8">
                        {error}
                        <button type="submit" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAUser;