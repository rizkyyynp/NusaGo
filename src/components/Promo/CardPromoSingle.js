import { useEffect, useState } from 'react';
import { fetchPromos } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="mt-8 grid gap-6  lg:grid-cols-3">
            {paginateItems(items).map((item, index) => (
                <Link href={`/promo/${item.id}`} key={index}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-BS3 cursor-pointer">
                        <div className=' relative overflow-hidden' style={{ width: '100%', height: '300px' }}>
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                layout='fill'
                                className="transition-transform duration-300 hover:scale-110"
                                objectFit='cover'
                                quality={100}
                                priority={true}
                            />
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <h3 className="lg:text-lg font-semibold text-primary font-hind text-md">{item.title}</h3>
                            <div className='flex items-center'>
                                <i className='text-primary fas fa-tags  mr-1 text-lg'></i>
                                <p className="text-primary font-nunito">Rp {formatPrice(item.promo_discount_price)}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
