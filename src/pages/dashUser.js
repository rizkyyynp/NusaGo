// pages/dashUser.js
import { useEffect, useState } from 'react';
import LayoutAdmin from "@/layouts/LayoutAdmin";
import ListUser from '@/components/User/ListUser';
import { checkAuthAdmin } from '../utils/adminAuth';
import useFetchUser from '@/hooks/useFetchUser';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function UserList() {
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

    return (
        <LayoutAdmin>
            <section className="lg:pt-24 lg:pb-10 lg:px-10 pl-16 pr-2 py-6">
                <div className="flex items-center justify-center mb-4">
                    <i className="fas fa-user-tie mr-2 text-2xl text-primary"></i>
                    <h1 className="text-2xl font-bold text-primary">List Users</h1>
                </div>
                <div className="mb-4">
                    <input 
                        type="text" 
                        value={search} 
                        onChange={handleSearch} 
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Search users by name..."
                    />
                </div>
                <ListUser users={filteredUsers.slice(startIndex, endIndex)} refetch={refetch} />
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
