import { fetchPromoById } from '@/lib/api';
import Layout from '@/layouts/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Hero from '@/components/Hero/Hero';
import React from 'react';
import { useSelector } from 'react-redux';

export default function PromoDetail({ promo }) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const router = useRouter();
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

    if (!promo) {
        return (
            <Layout>
                <div className="text-center py-16">
                    <h2 className="text-2xl font-bold">Promo Not Found</h2>
                    <p>Sorry, we couldn't find the promo you're looking for.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Hero />
            <section className={`${darkMode ? 'bg-dark1' : 'bg-secondary'} py-8 pl-16 pr-2 lg:px-8`}>
                <div>
                    <div className={`${darkMode ? 'bg-secondary' : 'bg-primary'} rounded-lg max-w-7xl mx-auto p-4`}>
                        <div className="flex flex-col md:flex-row ">
                            <div className="md:w-1/2 justify-center items-center flex">
                                <img src={promo.imageUrl} alt={promo.title} className="w-full h-auto rounded-lg" />
                            </div>
                            <div className="md:w-1/2 md:pl-6 mt-4 md:mt-10">
                                <h2 className="text-2xl font-bold mb-2 text-fourth font-podkova">{promo.title}</h2>
                                <p className="mb-2 text-fourth font-nunito"><span className="font-semibold font-hind">Description :</span> {promo.description}</p>
                                <p className="mb-2 text-fourth font-nunito"><span className="font-semibold font-hind">Terms Condition :</span> {promo.terms_condition}</p>
                                <p className="mb-2 text-fourth font-nunito"><span className="font-semibold font-hind">Promo Code :</span> {promo.promo_code}</p>
                                <p className="mb-2 text-fourth font-nunito"><span className="font-semibold font-hind">Discount Price :</span> Rp {formatPrice(promo.promo_discount_price)}</p>
                                <p className="mb-2 text-fourth font-nunito"><span className="font-semibold font-hind">Minimum Claim Price :</span> Rp {formatPrice(promo.minimum_claim_price)}</p>
                                <p className="mb-2 text-fourth font-nunito"><span className="font-semibold font-hind">Created At :</span> {formatDate(promo.createdAt)}</p>
                                <p className="mb-2 text-fourth font-nunito"><span className="font-semibold font-hind">Last Update :</span> {formatDate(promo.updatedAt)}</p>
                                <Link href="/promo">
                                    <button className={`${darkMode ? 'bg-dark1/80 hover:bg-dark1' : 'bg-secondary hover:bg-secondary/80'}  mt-4 py-2 px-4 rounded-lg text-fourth font-semibold font-nunito ml-2}`}>Back</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const { id } = params;
    const promo = await fetchPromoById(id);

    return {
        props: {
            promo,
        },
    };
}
