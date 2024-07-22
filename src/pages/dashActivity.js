import CardActivity from "@/components/Dashboard/cardActivity";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import Link from "next/link";
import { useState } from 'react';
import { checkAuthAdmin } from '../utils/adminAuth';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function dashActivity() {
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
            <section className="lg:pt-24 lg:pb-10 lg:px-10 pl-16 pr-2 py-6 bg-secondary">
                <div className="flex flex-col items-center mb-2 lg:flex-row lg:justify-between">
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-plane-departure text-zinc-100 mr-2 text-lg"></i>
                        <h1 className="text-2xl font-bold text-zinc-100">List Activity</h1>
                    </div>
                    <Link href="/createActivity">
                        <button className="flex items-center space-x-2 px-4 py-2 text-primary rounded bg-zinc-100 transition-all duration-100 ease-in-out hover:bg-secondary border-2 border-primary  hover:border-third hover:text-zinc-100 group ">
                        <i className="fas fa-plus text-primary mr-2 text-lg group-hover:text-zinc-100 "></i>
                            <span>Create</span>
                        </button>
                    </Link>
                </div>
                <CardActivity
                    currentPage={currentPage}
                    setPageCount={setMaxPage}
                    setItems={setItems}
                    items={items} // Pass items to CardActivitySingle
                />
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
        </LayoutAdmin>
    )
}