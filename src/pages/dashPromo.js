import { useEffect, useState } from 'react';
import LayoutAdmin from "@/layouts/LayoutAdmin";
import CardPromo from '@/components/Dashboard/cardPromo';
import { checkAuthAdmin } from '../utils/adminAuth';
import Link from 'next/link';
import useFetchPromo from '@/hooks/useFetchPromo';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function PromoList() {
    const { promos, maxPage, refetch } = useFetchPromo(); // Ambil maxPage dari useFetchBanner
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate which users to display based on pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <LayoutAdmin>
            <section className="lg:pt-24 lg:pb-10 lg:px-10 pl-16 pr-2 py-6">
                <div class="flex flex-col justify-center items-center space-y-4 lg:flex-row lg:justify-between lg:space-y-0 mb-4">
                    <div class="flex items-center space-x-2">
                        <i className="fas fa-tags text-2xl text-primary"></i>
                        <h1 class="text-2xl font-bold text-primary">List Promo</h1>
                    </div>
                    <Link href="/createPromo">
                        <button className="flex items-center space-x-2 px-4 py-2 text-primary rounded bg-zinc-100 transition-all duration-100 ease-in-out hover:bg-secondary border-2 border-primary  hover:border-third hover:text-zinc-100 group ">
                            <i className="fas fa-plus text-primary mr-2 text-lg group-hover:text-zinc-100 "></i>
                            <span>Create</span>
                        </button>
                    </Link>
                </div>
                <CardPromo promos={promos.slice(startIndex, endIndex)} refetch={refetch} />
                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`bg-zinc-100 text-primary py-2 px-4 rounded-full transition-all duration-100 ease-in-out ${currentPage === 1 ? 'cursor-not-allowed  text-primary border-2 border-primary' : 'hover:bg-secondary border-2 border-primary  hover:border-third hover:text-zinc-100'}`}
                    >
                        Previous
                    </button>
                    <p className="mx-4 text-primary">{currentPage}</p>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === maxPage}
                        className={`bg-zinc-100 text-primary py-2 px-6 rounded-full transition-all duration-100 ease-in-out ${currentPage === maxPage ? 'cursor-not-allowed  text-primary border-2 border-primary' : 'hover:bg-secondary border-2 border-primary  hover:border-third hover:text-zinc-100'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </LayoutAdmin>
    );
}
