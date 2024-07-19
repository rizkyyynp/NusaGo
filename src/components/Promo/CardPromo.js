import { useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CardPromo({ initialItems }) {
    const [items, setItems] = useState(initialItems);

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="bg-secondary py-8 pl-16 pr-2 lg:px-8">
            <div className="flex items-center mb-4">
                <i className="fas fa-tags text-zinc-100 mr-2 text-lg"></i>
                <h2 className="text-2xl font-bold text-zinc-100 font-podkova">Special Promo For You!</h2>
            </div>
            <p className="text-zinc-100 mb-6 font-hind">Exclusive Offer Just for You! Don't Miss Out!</p>
            <div>
                <div className="mt-8 slider-container">
                    <Slider {...settings}>
                        {items.map((item, index) => (
                            <Link href={`/promo/${item.id}`} key={index} className='px-2'>
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                                    <div className="overflow-hidden">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="p-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="lg:text-lg font-semibold text-zinc-800 font-hind text-md">{item.title}</h3>
                                            <p className="text-zinc-600 font-nunito">Rp {formatPrice(item.promo_discount_price)}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
