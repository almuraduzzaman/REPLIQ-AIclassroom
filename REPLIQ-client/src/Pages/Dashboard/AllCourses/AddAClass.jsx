import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AddAClass = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = (data) => {
        // console.log(data);

        const newItem = {
            Curriculum: (data.Curriculum).replace(/\\n/g, '\n').split(','),
            Lectures: data.Lectures,
            Students: data.Students,
            Training_program_benefits: (data.Training_program_benefits).split(','),
            Tutors: data.Tutors,
            domain: data.domain,
            duration: data.duration,
            img: data.img,
            king: data.king,
            overview: data.overview,
            title: data.title
        }
        // console.log(newItem)

        fetch(`https://repliq-server-phi.vercel.app/upload-course`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data?.insertedId) {
                    reset();
                    Swal.fire(
                        {
                            title: 'Good job!',
                            text: 'New Class Added!',
                            icon: 'success',
                            confirmButtonText: 'Continue',
                            confirmButtonColor: '#ab14a3'
                        }
                    );
                }
            })
    };


    return (
        <>
            <Helmet>
                <title>Add Class | AI-classroom</title>
            </Helmet>

            <section className="rounded-lg bg-gray-100 p-8 shadow-lg pb-20">
                <SectionTitle
                    heading={"Add a Class"}
                    subHeading={"Use the below form to create a new class"}
                />

                <div className="md:px-36">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                        <div className="flex gap-6">
                            <div className="w-1/2">
                                <label className="font-medium">Course Title</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Course Title"
                                    type="text"
                                    {...register("title", { required: true })}
                                />
                                {errors.title?.type === 'required' && <p className="text-xs text-red-300">Course Title is required</p>}
                            </div>
                            <div className="w-1/2">
                                <label className="font-medium">Tutors</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Instructors names"
                                    type="text"
                                    {...register("Tutors", { required: true })}
                                />
                                {errors.Tutors?.type === 'required' && <p className="text-xs text-red-300">Tutors is required</p>}
                            </div>
                        </div>


                        <div className="flex gap-6">
                            <div className="w-1/3">
                                <label className="font-medium">Domain</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Domain"
                                    type="text"
                                    {...register("domain", { required: true })}
                                />
                                {errors.domain?.type === 'required' && <p className="text-xs text-red-300">Domain is required</p>}
                            </div>
                            <div className="w-1/3">
                                <label className="font-medium">Duration</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Duration"
                                    type="text"
                                    {...register("duration", { required: true })}
                                />
                                {errors.duration?.type === 'required' && <p className="text-xs text-red-300">Duration is required</p>}
                            </div>
                            <div className="w-1/3">
                                <label className="font-medium">Lectures</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Total lectures"
                                    type="number"
                                    min='1'
                                    {...register("Lectures")}
                                />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-1/3">
                                <label className="font-medium">Students</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Students"
                                    type="number"
                                    min='1'
                                    {...register("Students", { required: true })}
                                />
                                {errors.Students?.type === 'required' && <p className="text-xs text-red-300">Students number is required</p>}
                            </div>
                            <div className="w-1/3">
                                <label className="font-medium">Course Image</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Course Image"
                                    type="url"
                                    {...register("img", { required: true })}
                                />
                                {errors.img?.type === 'required' && <p className="text-xs text-red-300">Course Image is required</p>}
                            </div>
                            <div className="w-1/3">
                                <label className="font-medium">King Image</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="King Image"
                                    type="url"
                                    {...register("king", { required: true })}
                                />
                                {errors.king?.type === 'required' && <p className="text-xs text-red-300">King Image is required</p>}
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-full">
                                <label className="font-medium">Training Benefits</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Enter each topic separated by comma"
                                    type="text"
                                    {...register("Training_program_benefits", { required: true })}
                                />
                                {errors.Training_program_benefits?.type === 'required' && <p className="text-xs text-red-300">Duration is required</p>}
                            </div>
                        </div>

                        <div className="flex gap-6">
                            {/* <div className="w-1/2">
                                <label className="font-medium">Curriculum</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Enter each topic separated by comma"
                                    type="text"
                                    {...register("Curriculum", { required: true })}
                                />
                                {errors.Curriculum?.type === 'required' && <p>Curriculum is required</p>}
                            </div> */}
                            <div className="w-full">
                                <label className="font-medium">Curriculum</label>
                                <textarea rows="2"
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Enter each topic separated by comma. For sub-topic separate each by \n"
                                    type="text"
                                    {...register("Curriculum", { required: true })}
                                ></textarea>
                                {errors.Curriculum?.type === 'required' && <p className="text-xs text-red-300">Curriculum is required</p>}
                            </div>



                        </div>


                        <div className="flex gap-6">
                            <div className="w-full">
                                <label className="font-medium">Overview</label>
                                <textarea
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Overview of your class..."
                                    type="text"
                                    rows="5"
                                    {...register("overview", { required: true })}
                                ></textarea>
                                {errors.overview?.type === 'required' && <p className="text-xs text-red-300">Overview is required</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                className="w-full cursor-pointer rounded-md bg-[#538EC8] hover:bg-[#4c77a1] hover:bg-gradient-to-r text-gray-100 py-3 px-5 text-base btn border-0"
                                type="submit"
                            >
                                ADD CLASS
                            </button>
                        </div>
                    </form>
                </div>
            </section >
        </>
    );
};

export default AddAClass;
