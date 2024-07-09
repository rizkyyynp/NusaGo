import Layout from '@/layouts/Layout';
import Link from 'next/link';
import { fetchActivityById } from '@/lib/api';
import Hero from '@/components/Hero/Hero';
export default function ActivityDetail({ activity }) {
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
        <Hero />
            <section className="bg-secondary py-8 pl-16 pr-2 lg:px-8">
                <div className="flex items-center mb-4">
                    <i className="fas fa-plane-departure text-zinc-100 mr-2 text-lg"></i>
                    <h2 className="text-2xl font-bold text-zinc-100">Activity Detail</h2>
                </div>
                <div>
                    <div className="flex flex-col md:flex-row gap-4 p-4">
                        <div className="bg-primary rounded-lg shadow-lg overflow-hidden w-full md:w-1/2">
                            <div className="relative">
                                <img
                                    src={activity.imageUrls}
                                    alt={activity.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110 lg:h-72"
                                    aria-hidden="true"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full p-1 flex items-center">
                                    <span className="text-yellow-500 text-xs"><i className="fa-solid fa-star"></i></span>
                                    <span className="text-base font-bold">{activity.rating}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-fourth mb-4">{activity.title}</h2>
                                <p className="text-fourth mb-4">{activity.description}</p>
                                <div className='flex items-center mb-4'>
                                    <i className="fas fa-location-dot text-zinc-100 mr-2 text-lg"></i>
                                    <p className="text-zinc-100">{activity.city}, {activity.province}</p>
                                </div>
                                <div className='flex items-center mb-4'>
                                    <p className="line-through text-fourth font-bold">Rp {formatPrice(activity.price)}</p>
                                    <p className='text-fourth font-bold mx-2'>To</p>
                                    <p className="text-fourth font-bold">Rp {formatPrice(activity.price_discount)}</p>
                                </div>
                                <div className='flex items-center'>
                                    <i className="fas fa-shower text-zinc-100 mr-2 text-lg"></i>
                                    <p className="text-zinc-100">{activity.facilities}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary rounded-lg shadow-lg overflow-hidden w-full md:w-1/2">
                            <div className="p-4 flex justify-center">
                                <h2 className="text-xl font-bold text-fourth">Map</h2>
                            </div>
                            <div className="w-full h-full mt-2 overflow-hidden rounded-b-xl">
                                <div dangerouslySetInnerHTML={{ __html: activity.location_maps }} className="rounded-b-xl object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/activity" className="flex justify-center">
                    <button className="bg-primary hover:bg-primary/80 mt-4 py-2 px-4 rounded-lg text-fourth font-semibold">Back</button>
                </Link>
            </section>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    const { id } = params;
    const activity = await fetchActivityById(id);

    return {
        props: {
            activity,
        },
    };
}