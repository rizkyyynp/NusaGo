import React, { useState } from 'react';
import Swal from "sweetalert2";
import useProfileUpdate from "@/hooks/useProfileUpdate";
import useFetchUser from '@/hooks/useFetchUser';

export default function ListUser({ users, refetch }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const { updateProfile } = useProfileUpdate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { role: e.target.role.value };

        for (const key in userData) {
            if (userData[key] === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Profile Failed',
                    text: 'Please fill all the fields',
                    timer: 1500,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end',
                    timerProgressBar: true,
                    customClass: {
                        timerProgressBar: 'custom-timer-progress-bar-failed',
                        title: 'title-failed',
                    },
                });
                return;
            }
        }

        handleUpdate(userData);
    };

    const handleUpdate = async (data) => {
        try {
            const res = await updateProfile(`update-user-role/${selectedUser.id}`, data);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Success',
                    text: 'Update Profile Successfully',
                    timer: 1500,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end',
                    timerProgressBar: true,
                    customClass: {
                        timerProgressBar: 'custom-timer-progress-bar',
                        title: 'title-success',
                    },
                }).then(() => {
                    refetch(); // Call the refetch function after successful update
                    setSelectedUser(null); // Close the modal
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data.message || 'Something went wrong',
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: 'custom-timer-progress-bar-failed',
                    title: 'title-failed',
                },
            });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map((item, index) => (
                <div className="bg-white rounded-lg shadow-BS4 overflow-hidden relative" key={index}>
                    <div className="p-4 flex justify-center items-center">
                        {item.profilePictureUrl ? (
                            <img
                                src={item.profilePictureUrl}
                                alt="Profile Picture"
                                className="rounded-full w-24 h-24"
                            />
                        ) : (
                            <div className="rounded-full w-24 h-24 bg-gray-300 flex items-center justify-center">
                                <i className="fas fa-user text-6xl text-primary"></i>
                            </div>
                        )}
                    </div>
                    <div className="bg-primary text-primary-foreground p-4">
                        <h1 className="text-xl font-semibold text-zinc-100">{item.name}</h1>
                        <p className="flex items-center text-zinc-100 font-nunito text-sm lg:text-md">
                            <i className='mr-2 text-xl far fa-envelope'></i>
                            {item.email}
                        </p>
                        <p className="flex items-center text-zinc-100 font-nunito text-sm lg:text-md my-2">
                            <i className='mr-2 text-xl fas fa-phone'></i>{item.phoneNumber}
                        </p>
                        <p className="flex items-center text-zinc-100 font-nunito text-sm lg:text-md">
                            <i className=' far fa-circle-user mr-2 text-xl'></i>{item.role}
                        </p>
                        <div className='flex items-center justify-center mt-4'>
                            <button className='text-zinc-100' onClick={() => setSelectedUser(item)}>
                                <i className="text-xl fas fa-pen-to-square"></i>
                                Update Role
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {selectedUser && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 pl-16 pr-2 lg:py-0">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Update Role for {selectedUser.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">New Role:</label>
                                <select
                                    id="role"
                                    name="role"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
                                <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setSelectedUser(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
