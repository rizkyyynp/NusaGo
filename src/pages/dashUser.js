import { useEffect, useState } from 'react';
import LayoutAdmin from "@/layouts/LayoutAdmin";
import ListUser from '@/components/User/ListUser';
import { checkAuthAdmin } from '../utils/adminAuth';
import useFetchUser from '@/hooks/useFetchUser';
import React from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function UserList() {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const { users, maxPage, refetch } = useFetchUser();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(
            users.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            )
        );
        setCurrentPage(1);
    }, [users, search]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate which users to display based on pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const isNextDisabled = endIndex >= filteredUsers.length;

    return (
        <LayoutAdmin>
            <section className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-white'}   p-8  lg:min-h-screen`}>
                <div className="flex flex-row items-center justify-between mb-6 mt-16 md:mt-0">
                    <div className='flex justify-center items-center'>
                        <i className={`${darkMode ? 'text-secondary' : 'text-primary'} fas fa-user-tie mr-2 text-lg`}></i>
                        <h2 className={`text-2xl lg:text-3xl font-bold font-podkova ${darkMode ? 'text-secondary' : 'text-primary'}`}>List Users</h2>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            className={`w-full p-2 border-2  rounded focus:outline-none focus:ring-primary focus:border-secondary text-primary ${darkMode ? 'border-secondary bg-dark1 placeholder:text-secondary text-secondary' : 'border-gray-300'}`}
                            placeholder="Search by name"
                        />
                    </div>
                </div>
                <ListUser users={filteredUsers.slice(startIndex, endIndex)} refetch={refetch} />
                <div className="flex justify-center items-center mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Previous
                    </button>
                    <p className={`${darkMode ? 'text-zinc-100' : 'text-primary'} mx-4`}>{currentPage}</p>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === maxPage || isNextDisabled}
                        className={`py-2 px-4 rounded-full transition-all duration-100 ease-in-out border-2 border-primary
                        ${darkMode ? 'hover:bg-dark1 text-zinc-100' : 'bg-zinc-100 text-primary hover:bg-secondary'}
                        ${currentPage === maxPage ? 'cursor-not-allowed' : 'hover:border-third hover:text-zinc-100 hover:bg-secondary'}`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </LayoutAdmin>
    );
}
