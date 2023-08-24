import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import exIns from '../../../assets/experiencedIns/experiencedIns.json';
import Lottie from "lottie-react";


const ExperiencedInstructor = () => {
    return (
        <>
            <SectionTitle heading={"Expert Guidance for AI Success"} subHeading={"Unlock your potential with our 20+ years experienced instructors"} />

            <div className="md:flex justify-center items-center mx-4 md:mx-24 rounded-xl shadow-lg -mt-8">
                <div className="md:w-1/3">
                    <Lottie animationData={exIns} loop={true} />
                </div>
                <div className="md:w-2/3 md:p-10">
                    <p className=" bg-gray-100 text-justify rounded-md shadow-md p-10 text-gray-500">
                        Our team of seasoned instructors brings over <span className="font-bold">two decades of practical industry expertise</span> to provide you with unparalleled guidance and insights in the field of AI. With their extensive knowledge and real-world experience, you'll receive the highest quality education and mentorship, ensuring your success in the exciting world of artificial intelligence.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ExperiencedInstructor;