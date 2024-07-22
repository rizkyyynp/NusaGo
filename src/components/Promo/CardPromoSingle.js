import { useEffect, useState } from 'react';
import { fetchPromos } from '@/lib/api';
import Link from 'next/link';

export default function CardPromoSingle({ currentPage, setPageCount }) {
    const [items, setItems] = useState([]);
    const itemsPerPage = 3;

    useEffect(() => {
        async function loadPromos() {
            const data = await fetchPromos();
            setItems(data);
            setPageCount(Math.ceil(data.length / itemsPerPage));
        }

        loadPromos();
    }, [setPageCount]);

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const paginateItems = (items) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    return (
        <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {paginateItems(items).map((item,index) => (
                <Link href={`/promo/${item.id}`} key={index}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-BS3 cursor-pointer">
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
                                <h3 className="text-lg font-semibold text-primary font-hind">{item.title}</h3>
                                <p className="text-primary font-nunito">Rp {formatPrice(item.promo_discount_price)}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
