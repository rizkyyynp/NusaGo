import { useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Marquee from '../magicui/marquee';

export default function CardCategories({ initialItems }) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const [items, setItems] = useState(initialItems);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-zinc-100'} py-8 pl-16 pr-2 lg:px-8`}>
            <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faLocationDot} className={`${darkMode ? 'text-secondary' : 'text-primary'} fas fa-location-dot mr-2 text-lg`} />
                <h2 className={`text-xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-primary'}`}>Our Categories</h2>
            </div>
            <p className={`mb-6 font-hind ${darkMode ? 'text-secondary' : 'text-primary'}`}>Find your perfect escape</p>
            <div className="relative">
                <Marquee className="py-4">
                    {items.map((item, index) => (
                        <div 
                            key={index} 
                            className="relative bg-white rounded-full overflow-hidden shadow-BS3 mx-2 flex items-center justify-center group"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="relative w-48 h-48 overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className={`w-full h-full object-cover transition-transform duration-300 rounded-full ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
                                />
                                {/* Overlay */}
                                {hoveredIndex === index && (
                                    <div className="absolute inset-0 bg-primary bg-opacity-60 flex items-center justify-center">
                                        <h3 className="text-3xl font-semibold text-white font-hind">{item.name}</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
