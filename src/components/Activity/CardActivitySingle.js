import { useEffect, useState } from 'react';
import { fetchActivities, fetchCategories, fetchActivitiesByCategory } from '@/lib/api';
import Link from 'next/link';

export default function CardActivitySingle({ currentPage, setPageCount, setItems, items }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const itemsPerPage = 3;

    useEffect(() => {
        async function loadCategories() {
            const categoryData = await fetchCategories();
            setCategories(categoryData);
        }

        loadCategories();
    }, []);

    useEffect(() => {
        async function loadActivitiesByCategory() {
            let data;
            if (selectedCategory === 'all') {
                data = await fetchActivities();
            } else {
                data = await fetchActivitiesByCategory(selectedCategory);
            }
            setItems(data);
            setPageCount(Math.ceil(data.length / itemsPerPage));
        }

        loadActivitiesByCategory();
    }, [selectedCategory, setItems, setPageCount]);

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const paginateItems = (items) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    return (
        <div>
            <div className="flex justify-center mb-4">
                <select
                    className="border-2 border-input rounded p-2 mr-2 font-podkova border-zinc-100 bg-secondary text-zinc-100"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                {paginateItems(items).length > 0 ? (
                    paginateItems(items).map((item, index) => (
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
                    ))
                ) : (
                    <p className="text-center text-zinc-100">No activities found for the selected category.</p>
                )}
            </div>
        </div>
    );
}
