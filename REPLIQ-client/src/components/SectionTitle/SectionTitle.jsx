
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-4 text-center md:mx-24 rounded-md py-4 mt-10 mb-8 bg-[#F6F7F8] shadow-md">
            <h3 className="text-xl md:text-3xl text-[#538EC8] font-bold">{heading}</h3>
            <p className="text-gray-500">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;