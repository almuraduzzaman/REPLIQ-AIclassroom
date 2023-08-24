import { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = ({ listItems, listImages }) => {

    const [itemId, setItemId] = useState(0);
    // console.log(listImages);

    return (
        <>
            <div className="bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC] px-10 py-20">
                <div className="flex flex-col-reverse lg:flex-row gap-2">
                    <div className="lg:w-1/2 flex flex-col justify-center items-center">
                        <ul className="space-y-5">
                            {listItems.map((item) => (
                                <li
                                    key={item.id}
                                    className={`my-3 text-center text-xl md:text-2xl font-bold text-gray-600 ${item.id === itemId ? "text-white transition-all scale-125 delay-75" : ""}`}
                                    style={{ transition: "all 0.3s ease-in-out", lineHeight: "1.5", letterSpacing: "1px" }}
                                >
                                    {item.text}
                                </li>

                            ))}
                        </ul>
                    </div>

                    <div className="lg:w-[45%] border-4 md:border-[20px] border-black rounded-md">
                        <Carousel
                            showIndicators={false}
                            showStatus={false}
                            showThumbs={false}
                            onChange={setItemId}
                            autoPlay={true}
                            infiniteLoop={true}
                            interval={2000}
                        >
                            {listImages.map((img, idx) => (
                                <div key={idx}>
                                    <img className="h-[200px] md:h-[350px]" src={img.img} alt={img.alt} />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Banner;