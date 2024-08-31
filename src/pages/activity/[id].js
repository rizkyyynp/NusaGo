import Layout from '@/layouts/Layout';
import Link from 'next/link';
import { fetchActivityById, fetchBanners } from '@/lib/api';
import React from 'react';
import { useSelector } from 'react-redux';
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
            <section className={`${darkMode ? 'bg-dark1' : 'bg-white'} p-8`}>
                    <div className="flex flex-col md:flex-row gap-6 mt-16 md:mt-0">
                        <div className={`${darkMode ? 'bg-secondary shadow-BS7 ' : 'bg-primary shadow-BS6 '} rounded-lg  overflow-hidden w-full md:w-1/2`}>
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
                                    <i className='fas fa-star'></i>
                                    </span>
                                    <span className="text-base font-semibold text-primary">{activity.rating}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h2 className="text-2xl font-bold text-fourth mb-4 font-hind">{activity.title}</h2>
                                <p className="text-fourth mb-4 font-nunito">{activity.description}</p>
                                <div className='flex items-center mb-4'>
                                    <i className='fas fa-location-dot text-zinc-100 mr-2 text-lg'></i>
                                    <p className="text-zinc-100 font-nunito">{activity.city}, {activity.province}</p>
                                </div>
                                <div className='flex items-center mb-4 font-nunito'>
                                    <i className='fas fa-tags text-zinc-100 mr-2 text-lg'></i>
                                    <p className="line-through text-fourth font-bold">Rp {formatPrice(activity.price)}</p>
                                    <p className='text-fourth font-bold mx-2'>To</p>
                                    <p className="text-fourth font-bold">Rp {formatPrice(activity.price_discount)}</p>
                                </div>
                                <div className='flex items-center'>
                                    <i className='fas fa-shower text-zinc-100 mr-2 text-lg'></i>
                                    <p className="text-zinc-100 font-nunito">{activity.facilities}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${darkMode ? 'bg-secondary shadow-BS6' : 'bg-primary shadow-BS7'} rounded-lg overflow-hidden w-full md:w-1/2`}>
                                <div dangerouslySetInnerHTML={{ __html: activity.location_maps }} className="rounded-b-xl object-cover w-full h-full"  />
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