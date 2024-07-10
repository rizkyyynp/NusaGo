import { useState } from 'react';

export default function CardCategories({ initialItems }) {
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
        <section className="bg-zinc-100 py-8 pl-16 pr-2 lg:px-8">
            <div className="flex items-center mb-2">
                <i className="fas fa-location-dot text-primary mr-2 text-lg"></i>
                <h2 className="text-2xl font-bold text-primary font-podkova">Our Categories</h2>
            </div>
            <p className="text-primary mb-6 font-hind">Find your perfect escape</p>
            <div>
                <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    {visibleItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
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
                        <button onClick={handleToggle} className="bg-zinc-100 text-primary border-2 border-secondary py-2 px-4 rounded-full hover:bg-secondary hover:border-2 hover:border-third hover:text-zinc-100 transition-all duration-100 ease-in-out font-podkova">
                            {showAll ? "Minimize" : "See All"} →
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
