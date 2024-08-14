import Layout from '@/layouts/Layout';
import Link from 'next/link';
import { fetchActivityById, fetchBanners } from '@/lib/api';
import Hero from '@/components/Hero/Hero';
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot, faShower, faTags } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function ActivityDetail({ activity, initialBanners }) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const formatPrice = (price) => {
        if (typeof price === 'number') {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return "0";
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const isValidImageUrl = (url) => {
        return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
    };

    if (!activity) {
        return (
            <Layout>
                <div className="text-center py-16">
                    <h2 className="text-2xl font-bold">Activity Not Found</h2>
                    <p>Sorry, we couldn't find the activity you're looking for.</p>
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
        <Hero initialItems={initialBanners} />
            <section className={`${darkMode ? 'bg-dark1' : 'bg-secondary'} py-8 pl-16 pr-2 lg:px-8`}>
                <div>
                    <div className="flex flex-col md:flex-row gap-4 p-4">
                        <div className={`${darkMode ? 'bg-secondary shadow-BS3 ' : 'bg-primary shadow-lg '} rounded-lg  overflow-hidden w-full md:w-1/2`}>
                            <div className="relative">
                                <div className='overflow-hidden' style={{ width: '100%', height: '280px' }}>
                                        {isValidImageUrl(activity.imageUrls[0]) ? (
                                            <Image
                                                src={activity.imageUrls[0]}
                                                alt={activity.title}
                                                layout='fill'
                                                className="transition-transform duration-300 hover:scale-110 object-cover object-center"
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
                                    <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    <span className="text-base font-semibold text-primary">{activity.rating}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h2 className="text-2xl font-bold text-fourth mb-4 font-hind">{activity.title}</h2>
                                <p className="text-fourth mb-4 font-nunito">{activity.description}</p>
                                <div className='flex items-center mb-4'>
                                    <FontAwesomeIcon icon={faLocationDot} className='text-zinc-100 mr-2 text-lg' />
                                    <p className="text-zinc-100 font-nunito">{activity.city}, {activity.province}</p>
                                </div>
                                <div className='flex items-center mb-4 font-nunito'>
                                    <FontAwesomeIcon icon={faTags} className='text-zinc-100 mr-2 text-lg' />
                                    <p className="line-through text-fourth font-bold">Rp {formatPrice(activity.price)}</p>
                                    <p className='text-fourth font-bold mx-2'>To</p>
                                    <p className="text-fourth font-bold">Rp {formatPrice(activity.price_discount)}</p>
                                </div>
                                <div className='flex items-center'>
                                    <FontAwesomeIcon icon={faShower} className='text-zinc-100 mr-2 text-lg' />
                                    <p className="text-zinc-100 font-nunito">{activity.facilities}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${darkMode ? 'bg-secondary shadow-BS3' : 'bg-primary shadow-lg'} rounded-lg overflow-hidden w-full md:w-1/2`}>
                            <div className="p-4 flex justify-center">
                                <h2 className="text-2xl font-bold text-fourth font-podkova">Map</h2>
                            </div>
                            <div className="w-full h-full mt-2 overflow-hidden rounded-b-xl">
                                <div dangerouslySetInnerHTML={{ __html: activity.location_maps }} className="rounded-b-xl object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/activity" className="flex justify-center">
                    <button className={`${darkMode ? 'bg-secondary/80 hover:bg-secondary' : 'bg-primary hover:bg-primary/80'}  mt-4 py-2 px-4 rounded-lg text-fourth font-semibold font-nunito}`}>Back</button>
                </Link>
            </section>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    const { id } = params;
    const [initialBanners, activity] = await Promise.all([fetchBanners(),fetchActivityById(id) ]);

    return {
        props: {
            activity,
            initialBanners,
        },
    };
}