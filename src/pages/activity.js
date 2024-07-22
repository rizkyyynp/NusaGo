import CardActivitySingle from "@/components/Activity/CardActivitySingle";
import Layout from "@/layouts/Layout";
import Hero from "@/components/Hero/Hero";
import { useState } from 'react';

export default function Activity() {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [items, setItems] = useState([]);

    const nextPage = () => {
        if (currentPage < maxPage) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const areButtonsDisabled = items.length === 0;

    return (
        <Layout>
            <Hero />
            <section className="bg-secondary py-8 pl-16 pr-2 lg:px-8">
                <div className="flex items-center mb-4">
                    <i className="fas fa-plane-departure text-zinc-100 mr-2 text-lg"></i>
                    <h2 className="text-xl font-bold text-zinc-100 font-podkova">Discover Diverse Activities</h2>
                </div>
                <p className="text-zinc-100 mb-6 font-hind text-lg">Explore a Variety of Activities Waiting to Be Discovered</p>
                <div>
                    <CardActivitySingle 
                        currentPage={currentPage} 
                        setPageCount={setMaxPage} 
                        setItems={setItems} 
                        items={items} // Pass items to CardActivitySingle
                    />
                </div>
                <div className="mt-6 mx-auto flex justify-center items-center font-nunito">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1 || areButtonsDisabled}
                        className={`bg-zinc-100 text-primary py-2 px-4 rounded-full transition-all duration-100 ease-in-out ${currentPage === 1 || areButtonsDisabled ? 'cursor-not-allowed  text-primary border-2 border-primary' : 'hover:bg-secondary border-2 border-primary  hover:border-third hover:text-zinc-100'}`}
                    >
                        Previous
                    </button>
                    <p className="mx-4 text-zinc-100">{currentPage}</p>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === maxPage || areButtonsDisabled}
                        className={`bg-zinc-100 text-primary py-2 px-6 rounded-full transition-all duration-100 ease-in-out ${currentPage === maxPage || areButtonsDisabled ? 'cursor-not-allowed  text-primary border-2 border-primary' : 'hover:bg-secondary border-2 border-primary  hover:border-third hover:text-zinc-100'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </Layout>
    );
}
