import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Hero({ initialItems }) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const [items, setItems] = useState(initialItems);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 3000,
        cssEase: "linear",
    };

    return (
        <div className="relative h-[60vh] p-8">
            <div className="absolute inset-0">
                <Slider {...settings}>
                    {items.map((item, index) => (
                        <div key={index} className="relative h-[60vh] ">
                            <Image src={item.imageUrl} alt="Slide Image" layout="fill" objectFit="cover" quality={100} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center ${darkMode ? 'bg-dark1 bg-opacity-60' : 'bg-primary'} bg-opacity-50`}>
                <div className="text-center text-white">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 font-hind">Your Guide to Indonesian Treasures</h1>
                    <Link href={'/activity'}>
                        <button className="bg-primary text-zinc-100 hover:bg-primary/80 px-2 py-1 lg:px-6 lg:py-3 rounded-lg border-2 border-white font-nunito animate-bounce">Discover More</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
