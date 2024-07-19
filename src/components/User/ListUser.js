import React, { useState } from 'react';
import Swal from "sweetalert2";
import useProfileUpdate from "@/hooks/useProfileUpdate";
import { useRouter } from 'next/router';

export default function ListUser({ users }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const { updateProfile } = useProfileUpdate();
    const router = useRouter();

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
                    showConfirmButton: false
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
                    text: 'You have successfully updated your profile',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    router.reload();
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data.message || 'Something went wrong',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map((item, index) => (
                <div className="bg-white rounded-lg shadow-md overflow-hidden relative" key={index}>
                    <div className="p-4 flex justify-center items-center">
                        {item.profilePictureUrl ? (
                            <img
                                src={item.profilePictureUrl}
                                alt="Profile Picture"
                                className="rounded-full w-24 h-24"
                            />
                        ) : (
                            <i className="fas fa-user text-2xl text-gray-300"></i>
                        )}
                    </div>
                    <div className="bg-primary text-primary-foreground p-4">
                        <h1 className="text-xl font-semibold text-gray-800">{item.name}</h1>
                        <p className="flex items-center text-gray-700 font-nunito text-sm lg:text-lg">
                            <i className="far fa-envelope mr-2 text-xl"></i>{item.email}
                        </p>
                        <p className="flex items-center text-gray-700 font-nunito text-sm lg:text-lg">
                            <i className="fas fa-phone mr-2 text-xl"></i>{item.phoneNumber}
                        </p>
                        <p className="flex items-center text-gray-700 font-nunito text-sm lg:text-lg">
                            <i className="far fa-circle-user text-xl mr-2"></i>{item.role}
                        </p>
                        <div className='flex items-center justify-center mt-4'>
                            <button className='text-gray-700' onClick={() => setSelectedUser(item)}>
                                <i className="fas fa-pen-to-square text-white mr-2 text-xl"></i>Update Role
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal for updating role */}
            {selectedUser && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
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
