import Hero from "@/components/Hero/Hero";
import CardPromoSingle from "@/components/Promo/CardPromoSingle";
import Layout from "@/layouts/Layout";
import { useState } from 'react';


export default function Promo() {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const nextPage = () => {
        if (currentPage < maxPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <Layout>
        <Hero />
            <section className="bg-secondary py-8 pl-16 pr-2 lg:px-8">
                <div className="flex items-center mb-4">
                    <i className="fas fa-tags text-zinc-100 mr-2 text-lg"></i>
                    <h2 className="text-2xl font-bold text-zinc-100 font-podkova">Special Promo For You!</h2>
                </div>
                <p className="text-zinc-100 mb-6 font-hind">Exclusive Offer Just for You! Don't Miss Out!</p>
                <CardPromoSingle
                    currentPage={currentPage}
                    setPageCount={setMaxPage}
                />
                <div className="mt-6 mx-auto flex justify-center items-center font-nunito">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`bg-zinc-100 text-primary py-2 px-4 rounded-full transition-all duration-100 ease-in-out ${currentPage === 1 ? 'cursor-not-allowed  text-primary border-2 border-primary' : 'hover:bg-secondary border-2 border-primary  hover:border-third hover:text-zinc-100'}`}
                    >
                        Previous
                    </button>
                    <p className="mx-4 text-zinc-100">{currentPage}</p>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === maxPage}
                        className={`bg-zinc-100 text-primary py-2 px-6 rounded-full transition-all duration-100 ease-in-out ${currentPage === maxPage ? 'cursor-not-allowed  text-primary border-2 border-primary' : 'hover:bg-secondary border-2 border-primary  hover:border-third hover:text-zinc-100'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </Layout>
    );
}
