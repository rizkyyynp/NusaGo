import Hero from "@/components/Hero/Hero";
import CardPromoSingle from "@/components/Promo/CardPromoSingle";
import Layout from "@/layouts/Layout";
import { useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';


export default function Promo() {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
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
            <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-secondary'} py-8 pl-16 pr-2 lg:px-8`}>
                <div className="flex items-center mb-4">
                    <i className={`${darkMode ? 'text-secondary' : 'text-zinc-100'} fas fa-tags  mr-2 text-lg`}></i>
                    <h2 className={`text-xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-zinc-100'}`}>Special Promo For You!</h2>
                </div>
                <p className={`mb-6 font-hind ${darkMode ? 'text-secondary' : 'text-zinc-100'}`}>Exclusive Offer Just for You! Don't Miss Out!</p>
                <CardPromoSingle
                    currentPage={currentPage}
                    setPageCount={setMaxPage}
                />
                <div className="mt-6 mx-auto flex justify-center items-center font-nunito">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={` py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === 1 ? 
                        'cursor-not-allowed   ' : '  hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Previous
                    </button>
                    <p className="mx-4 text-zinc-100">{currentPage}</p>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === maxPage}
                        className={` py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === maxPage ? 
                        'cursor-not-allowed   ' : '  hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </Layout>
    );
}
