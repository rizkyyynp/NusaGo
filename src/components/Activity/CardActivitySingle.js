import { useEffect, useState } from 'react';
import { fetchActivities, fetchCategories, fetchActivitiesByCategory } from '@/lib/api';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function CardActivitySingle({ currentPage, setCurrentPage, setPageCount, setItems, items }) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const [categories, setCategories] = useState([]);
    const [showContent, setShowContent] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 3;

    useEffect(() => {
        async function loadCategories() {
            const categoryData = await fetchCategories();
            setCategories(categoryData);
        }

        loadCategories();
    }, []);

    useEffect(() => {
        async function loadActivities() {
            setLoading(true);
            setShowContent(false); // Hide content during loading
            let data;
            if (selectedCategory === 'all') {
                data = await fetchActivities();
            } else {
                data = await fetchActivitiesByCategory(selectedCategory);
            }
            setItems(data);
            setPageCount(Math.ceil(data.length / itemsPerPage));
            setLoading(false);

            setTimeout(() => setShowContent(true), 5000);
        }

        loadActivities();
    }, [selectedCategory, currentPage]);

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const paginateItems = (items) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const isValidImageUrl = (url) => {
        return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
    };

    return (
        <>
            <div className="flex justify-center lg:justify-start mb-4">
                <select
                    className={`${darkMode ? 'bg-primary' : 'bg-secondary'} border-2 border-input rounded p-2 mr-2 font-podkova border-zinc-100 text-zinc-100`}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="all" className='bg-zinc-100 text-primary'>All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id} className='bg-zinc-100 text-primary'>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {paginateItems(items).length > 0 ? (
                        paginateItems(items).map((item, index) => (
                            <Link href={`/activity/${item.id}`} key={index}>
                                <div className="bg-zinc-100 rounded-lg overflow-hidden shadow-BS3 cursor-pointer">
                                    <div className="relative">
                                        <div className=' relative overflow-hidden' style={{  width: '100%', height: '300px' }}>
                                            {isValidImageUrl(item.imageUrls[0]) ? (
                                                <Image
                                                    src={item.imageUrls[0]}
                                                    alt={item.title}
                                                    layout='fill'
                                                    className="transition-transform duration-300 hover:scale-110"
                                                    objectFit='cover'
                                                    quality={100}
                                                    priority={true}
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                                                    <span className="text-gray-500">Image not available</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute top-2 right-2 bg-white rounded-full p-1 flex items-center">
                                            <span className="text-yellow-500 text-xs">
                                                <i className='fas fa-star'></i>
                                            </span>
                                            <span className="text-base font-semibold font-hind text-primary">{item.rating}</span>
                                        </div>
                                    </div>
                                    <div className="p-1 flex justify-between items-end">
                                        <div>
                                            <h3 className="text-lg font-semibold text-primary font-hind">{item.title}</h3>
                                            <p className="text-primary font-nunito">
                                                <i className='fas fa-location-dot text-primary mr-1'></i>
                                                {item.city}
                                            </p>
                                            <p className="text-primary font-nunito"><i className='fas fa-location-dot text-primary mr-1'></i>{item.province}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="line-through text-primary font-nunito">Rp {formatPrice(item.price)}</p>
                                            <p className="text-primary font-bold font-nunito">Rp {formatPrice(item.price_discount)}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-zinc-100">No activities found for the selected category.</p>
                    )}
                </div>
            )}
        </>
    );
}
