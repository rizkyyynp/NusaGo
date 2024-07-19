import { useEffect, useState } from 'react';
import LayoutAdmin from "@/layouts/LayoutAdmin";
import CardBanner from '@/components/DashboardBanner/cardBanner';
import { checkAuthAdmin } from '../utils/adminAuth';
import useFetchBanner from '@/hooks/useFetchBanner';
import Link from 'next/link';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function BannerList() {
    const { banners, maxPage } = useFetchBanner(); // Ambil maxPage dari useFetchBanner
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
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-2">
                        <img src="https://openui.fly.dev/openui/24x24.svg?text=👤" alt="profile-icon" class="w-6 h-6" />
                        <h1 class="text-2xl font-bold text-primary">Data</h1>
                    </div>
                    <Link href="/createBanner">
                        <button class="flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-primary-foreground">
                            <img src="https://openui.fly.dev/openui/24x24.svg?text=➕" alt="create-icon" class="w-4 h-4" />
                            <span>Create</span>
                        </button>
                    </Link>

                </div>
                <CardBanner banners={banners.slice(startIndex, endIndex)} />
                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`bg-zinc-100 text-primary py-2 px-4 rounded-full transition-all duration-100 ease-in-out ${currentPage === 1 ? 'cursor-not-allowed bg-gray-800 text-zinc-50 border-2 border-zinc-100' : 'hover:bg-secondary hover:border-2 hover:border-third hover:text-zinc-100'}`}
                    >
                        Previous
                    </button>
                    <p className="mx-4 text-zinc-100">{currentPage}</p>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === maxPage}
                        className={`bg-zinc-100 text-primary py-2 px-6 rounded-full transition-all duration-100 ease-in-out ${currentPage === maxPage ? 'cursor-not-allowed bg-gray-800 text-zinc-50 border-2 border-zinc-100' : 'hover:bg-secondary hover:border-2 hover:border-third hover:text-zinc-100'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </LayoutAdmin>
    );
}
