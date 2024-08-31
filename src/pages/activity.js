import CardActivitySingle from "@/components/Activity/CardActivitySingle";
import Layout from "@/layouts/Layout";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchBanners } from "@/lib/api";

export default function Activity({ initialBanners }) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
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
            <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-white'} p-8 min-h-screen`}>
                <div className="flex items-center mb-4 mt-16 md:mt-0">
                    <i className={`fas fa-plane-departure ${darkMode ? 'text-secondary' : 'text-primary'} mr-2 text-lg`}></i>
                    <h2 className={`text-xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-primary'}`}>Discover Diverse Activities</h2>
                </div>
                <p className={`mb-6 font-hind ${darkMode ? 'text-secondary' : 'text-primary'}`}>Explore a Variety of Activities Waiting to Be Discovered</p>
                    <CardActivitySingle
                        currentPage={currentPage}
                        setPageCount={setMaxPage}
                        setCurrentPage={setCurrentPage}
                        setItems={setItems}
                        items={items}
                    />
                <div className="flex justify-center items-center mt-8 font-nunito">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1 || areButtonsDisabled}
                        className={`py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === 1 || areButtonsDisabled ? 'cursor-not-allowed' : 'hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Previous
                    </button>
                    <p className={`${darkMode ? 'text-zinc-100' : 'text-primary'} mx-4`}>{currentPage}</p>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === maxPage || areButtonsDisabled}
                        className={`py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === maxPage || areButtonsDisabled ? 'cursor-not-allowed' : 'hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </Layout>
    );
}

export async function getServerSideProps() {
    const [initialBanners] = await Promise.all([fetchBanners()]);

    return {
        props: {
            initialBanners,
        },
    };
}
