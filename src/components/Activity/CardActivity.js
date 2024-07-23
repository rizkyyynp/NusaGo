import { useState } from "react";
import Link from "next/link";
import React from 'react';
import { useSelector } from 'react-redux';

export default function CardActivity({initialItems}) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const [items, setItems] = useState(initialItems);
    const [visibleItems, setVisibleItems] = useState(initialItems.slice(0, 3));
    const [showAll, setShowAll] = useState(false);
    const [hideButton, setHideButton] = useState(initialItems.length <= 3);

    const handleToggle = () => {
        if (showAll) {
            setVisibleItems(items.slice(0, 3));
        } else {
            setVisibleItems(items);
        }
        setShowAll(!showAll);
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-secondary'} py-8 pl-16 pr-2 lg:px-8`}>
            <div className="flex items-center mb-4">
                <i className={`${darkMode ? 'text-secondary' : 'text-zinc-100'} fas fa-plane-departure  mr-2 text-lg`}></i>
                <h2 className={`text-xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-zinc-100'}`}>Discover Diverse Activities</h2>
            </div>
            <p className={`mb-6 font-hind ${darkMode ? 'text-secondary' : 'text-zinc-100'}`}>Explore a Variety of Activities Waiting to Be Discovered</p>
            <div>
                <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    {visibleItems.map((item, index) => (
                        <Link href={`/activity/${item.id}`} key={index}>
                            <div className="bg-zinc-100 rounded-lg overflow-hidden  cursor-pointer shadow-BS3">
                                <div className="relative">
                                    <img
                                        src={item.imageUrls}
                                        alt={item.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                                        aria-hidden="true"
                                    />
                                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 flex items-center">
                                        <span className="text-yellow-500 text-xs"><i className="fa-solid fa-star"></i></span>
                                        <span className="text-base font-semibold font-hind text-primary">{item.rating}</span>
                                    </div>
                                </div>
                                <div className="px-3 py-2 flex flex-col justify-start ">
                                    <div>
                                        <h3 className="text-md lg:text-lg font-semibold text-primary font-hind">{item.title}</h3>
                                        <p className="text-primary font-nunito text-md lg:text-lg"><i className="fas fa-map-marker-alt text-primary mr-1"></i>{item.city}, {item.province}</p>
                                    </div>
                                    <div >
                                        <p className="line-through text-primary font-nunito text-md">Rp {formatPrice(item.price)}</p>
                                        <p className="text-primary font-bold font-nunito text-md">Rp {formatPrice(item.price_discount)}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {!hideButton && (
                    <div className="mt-8 text-center">
                        <button onClick={handleToggle} className={`${darkMode ? 'hover:bg-dark1' : 'hover:bg-secondary'} bg-zinc-100 text-primary border-2 border-secondary py-2 px-4 rounded-full  hover:border-2 hover:border-third hover:text-zinc-100 transition-all duration-100 ease-in-out font-podkova `}>
                            {showAll ? "Minimize" : "See All"} →
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}