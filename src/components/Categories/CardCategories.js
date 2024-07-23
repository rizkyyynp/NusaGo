import { useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';

export default function CardCategories({ initialItems }) {
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

    return (
        <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-zinc-100'} py-8 pl-16 pr-2 lg:px-8`}>
            <div className="flex items-center mb-4">
                <i className={`${darkMode ? 'text-secondary' : 'text-primary'} fas fa-location-dot  mr-2 text-lg`}></i>
                <h2  className={`text-xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-primary'}`}>Our Categories</h2>
            </div>
            <p className={`mb-6 font-hind ${darkMode ? 'text-secondary' : 'text-primary'}`}>Find your perfect escape</p>
            <div>
                <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    {visibleItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-BS3">
                            <div className="overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="p-4 flex justify-center items-center">
                                <h3 className="text-lg font-semibold text-primary font-hind">{item.name}</h3>
                            </div>
                        </div>
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
    );
}
