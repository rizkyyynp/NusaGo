import { useEffect, useState } from 'react';
import LayoutAdmin from "@/layout/LayoutAdmin";
import CardBanner from '@/components/Admin/cardBanner';
import { checkAuthAdmin } from '../utils/adminAuth';
import useFetchBanner from '@/hooks/useFetchBanner';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { IoIosImages } from "react-icons/io";
import { FaPlus } from 'react-icons/fa6';


export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function BannerList() {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const { banners, maxPage, refetch } = useFetchBanner(); // Ambil maxPage dari useFetchBanner

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
            <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-white'} p-8 lg:min-h-screen`}>
                <div className="flex flex-row items-center justify-between mb-6 mt-16 md:mt-0">
                    <div className="flex items-center justify-center space-x-2">
                        <IoIosImages className={`text-2xl ${darkMode ? 'text-secondary' : 'text-primary'}`} />
                        <h2 className={`text-2xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-primary'}`}>List Banner</h2>
                    </div>
                    <Link href="/createBanner">
                        <button className={`flex items-center space-x-2 px-4 py-2  rounded  transition-all duration-100 ease-in-out  border-2 border-primary  hover:border-third hover:text-zinc-100 group ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-white text-primary hover:bg-secondary'}`}>
                            <FaPlus className={`mr-2 text-lg group-hover:text-zinc-100 ${darkMode ? 'text-zinc-100' : 'text-primary'}`} />
                            <span>Create</span>
                        </button>
                    </Link>

                </div>
                <CardBanner banners={banners.slice(startIndex, endIndex)} refetch={refetch} />
                <div className="flex justify-center items-center mt-10">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={` py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === 1 ?
                                'cursor-not-allowed   ' : '  hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Previous
                    </button>
                    <p className={`${darkMode ? 'text-zinc-100' : 'text-primary'} mx-4`}>{currentPage}</p>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
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
        </LayoutAdmin>
    );
}
