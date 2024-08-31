import CardActivity from "@/components/Dashboard/cardActivity";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import Link from "next/link";
import { useState } from 'react';
import { checkAuthAdmin } from '../utils/adminAuth';
import React from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function dashActivity() {
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
        <LayoutAdmin>
            <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-white'} p-8 lg:min-h-screen`}>
                <div className="flex flex-col items-start md:items-center mb-2 lg:flex-row lg:justify-between mt-16 md:mt-0">
                    <div className="flex items-center space-x-2">
                        <i className={`${darkMode ? 'text-secondary' : 'text-primary'} fas fa-plane-departure  mr-2 text-lg`}></i>
                        <h2 className={`text-2xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-primary'}`}>List Activity</h2>
                    </div>
                    <Link href="/createActivity">
                        <button className={`flex items-center space-x-2 px-4 py-2  rounded  transition-all duration-100 ease-in-out  border-2 border-primary  hover:border-third hover:text-zinc-100 group ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}`}>
                            <i className={`fas fa-plus  mr-2 text-lg group-hover:text-zinc-100 ${darkMode ? 'text-zinc-100' : 'text-primary'}`}></i>
                            <span>Create</span>
                        </button>
                    </Link>
                </div>
                <CardActivity
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setPageCount={setMaxPage}
                    setItems={setItems}
                    items={items} // Pass items to CardActivitySingle
                />
                <div className="mt-6 mx-auto flex justify-center items-center font-nunito">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1 || areButtonsDisabled}
                        className={` py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === 1 || areButtonsDisabled ? 
                        'cursor-not-allowed   ' : '  hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Previous
                    </button>
                    <p className={`${darkMode ? 'text-zinc-100' : 'text-primary'} mx-4`}>{currentPage}</p>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === maxPage || areButtonsDisabled}
                        className={` py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === maxPage || areButtonsDisabled ? 
                        'cursor-not-allowed   ' : '  hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </LayoutAdmin>
    )
}