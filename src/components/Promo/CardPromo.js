import { useState } from 'react';
import Link from 'next/link';

export default function CardPromo({ initialItems }) {
    const [items, setItems] = useState(initialItems);
    const [visibleItems, setVisibleItems] = useState(initialItems.slice(0, 3));
    const [showAll, setShowAll] = useState(false);

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
                <i className="fas fa-tags text-zinc-100 mr-2 text-lg"></i>
                <h2 className="text-2xl font-bold text-zinc-100 font-podkova">Special Promo For You!</h2>
            </div>
            <p className="text-zinc-100 mb-6 font-hind">Exclusive Offer Just for You! Don't Miss Out!</p>
            <div>
                <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    {visibleItems.map((item, index) => (
                        <Link href={`/promo/${item.id}`} key={index}>
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
                                    <h3 className="text-lg font-semibold text-zinc-800 font-hind">{item.title}</h3>
                                    <p className="text-zinc-600 font-nunito">Rp {formatPrice(item.promo_discount_price)}</p>
                                </div>
                            </div>
                        </div>
                        </Link>

                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button onClick={handleToggle} className="bg-zinc-100 text-primary py-2 px-4 rounded-full hover:bg-secondary hover:border-2 hover:border-third hover:text-zinc-100 transition-all duration-100 ease-in-out font-podkova">
                        {showAll ? "Minimize" : "See All"} →
                    </button>
                </div>
            </div>
        </section>
    );
}
