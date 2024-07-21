import CardActivity from "@/components/Dashboard/cardActivity";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import Link from "next/link";
import { useState } from 'react';

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
            <section className="lg:pt-24 lg:pb-10 lg:px-10 pl-16 pr-2 py-6 bg-third">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <img src="https://openui.fly.dev/openui/24x24.svg?text=👤" alt="profile-icon" className="w-6 h-6" />
                        <h1 className="text-2xl font-bold text-primary">dashActivity</h1>
                    </div>
                    <Link href="/createActivity">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-primary-foreground">
                            <img src="https://openui.fly.dev/openui/24x24.svg?text=➕" alt="create-icon" className="w-4 h-4" />
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
                        className={`bg-zinc-100 text-primary py-2 px-4 rounded-full transition-all duration-100 ease-in-out ${currentPage === 1 || areButtonsDisabled ? 'cursor-not-allowed bg-gray-800 text-zinc-50 border-2 border-zinc-100' : 'hover:bg-secondary hover:border-2 hover:border-third hover:text-zinc-100'}`}
                    >
                        Previous
                    </button>
                    <p className="mx-4 text-zinc-100">{currentPage}</p>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === maxPage || areButtonsDisabled}
                        className={`bg-zinc-100 text-primary py-2 px-6 rounded-full transition-all duration-100 ease-in-out ${currentPage === maxPage || areButtonsDisabled ? 'cursor-not-allowed bg-gray-800 text-zinc-50 border-2 border-zinc-100' : 'hover:bg-secondary hover:border-2 hover:border-third hover:text-zinc-100'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </LayoutAdmin>
    )
}