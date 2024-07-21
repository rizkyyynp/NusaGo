import { useState } from "react";
import Link from "next/link";

export default function CardActivity({initialItems}) {
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
        <section className="bg-secondary py-8 pl-16 pr-2 lg:px-8">
            <div className="flex items-center mb-4">
                <i className="fas fa-plane-departure text-zinc-100 mr-2 text-lg"></i>
                <h2 className="text-2xl font-bold text-zinc-100 font-podkova">Discover Diverse Activities</h2>
            </div>
            <p className="text-zinc-100 mb-6 font-hind">Explore a Variety of Activities Waiting to Be Discovered</p>
            <div>
                <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    {visibleItems.map((item, index) => (
                        <Link href={`/activity/${item.id}`} key={index}>
                            <div className="bg-zinc-100 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                <div className="relative">
                                    <img
                                        src={item.imageUrls}
                                        alt={item.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                                        aria-hidden="true"
                                    />
                                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 flex items-center">
                                        <span className="text-yellow-500 text-xs"><i className="fa-solid fa-star"></i></span>
                                        <span className="text-base font-bold font-hind">{item.rating}</span>
                                    </div>
                                </div>
                                <div className="p-1 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary font-hind">{item.title}</h3>
                                        <p className="text-primary font-nunito"><i className="fas fa-map-marker-alt text-primary mr-1"></i>{item.city}, {item.province}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="line-through text-primary font-nunito">Rp {formatPrice(item.price)}</p>
                                        <p className="text-primary font-bold font-nunito">Rp {formatPrice(item.price_discount)}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {!hideButton && (
                    <div className="mt-8 text-center">
                        <button onClick={handleToggle} className="bg-zinc-100 text-primary py-2 px-4 rounded-full hover:bg-secondary hover:border-2 hover:border-third hover:text-zinc-100 transition-all duration-100 ease-in-out">
                            {showAll ? "Minimize" : "See All"} →
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}