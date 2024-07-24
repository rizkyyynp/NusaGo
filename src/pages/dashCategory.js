import { useEffect, useState } from 'react';
import LayoutAdmin from "@/layouts/LayoutAdmin";
import CardCategory from '@/components/Dashboard/cardCategory';
import { checkAuthAdmin } from '../utils/adminAuth';
import useFetchCategory from '@/hooks/useFetchCategory';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function CategoryList() {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const { category, maxPage, refetch } = useFetchCategory();
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
            <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-zinc-100'} lg:pt-24 lg:pb-10 lg:px-10 pl-16 pr-2 py-6 lg:min-h-screen`}>
                <div className="flex flex-col justify-center items-center space-y-4 lg:flex-row lg:justify-between lg:space-y-0 mb-4">
                    <div className="flex items-center space-x-2">
                        <i className={`${darkMode ? 'text-secondary' : 'text-primary'} fas fa-list  mr-2 text-lg`}></i>
                        <h2 className={`text-2xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-primary'}`}>List Category</h2>
                    </div>
                    <Link href="/createCategory">
                        <button className={`flex items-center space-x-2 px-4 py-2  rounded  transition-all duration-100 ease-in-out  border-2 border-primary  hover:border-third hover:text-zinc-100 group ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}`}>
                            <i className={`fas fa-plus  mr-2 text-lg group-hover:text-zinc-100 ${darkMode ? 'text-zinc-100' : 'text-primary'}`}></i>
                            <span>Create</span>
                        </button>
                    </Link>

                </div>
                <CardCategory category={category.slice(startIndex, endIndex)} refetch={refetch} />
                <div className="flex justify-center items-center mt-4">
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
