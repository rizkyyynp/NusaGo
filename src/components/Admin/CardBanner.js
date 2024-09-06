import React, { useState } from 'react';
import Swal from "sweetalert2";
import useUpdateData from "@/hooks/useUpdateData";
import { useRouter } from 'next/router';
import useImageUpload from "@/hooks/useImageUpload";
import useDeleteData from '@/hooks/useDeleteData';
import { useSelector, useDispatch } from 'react-redux';
import { disableDarkMode } from "@/redux/slices/darkModeSlice";
import {
    IconCalendarPlus,
    IconCalendarTime,
    IconEditCircle,
    IconTrash,
} from '@tabler/icons-react';
import { IoClose } from 'react-icons/io5';
import { FaPenToSquare, FaUser } from 'react-icons/fa6';


export default function CardBanner({ banners, refetch }) {
    const [selectedBanner, setSelectedBanner] = useState(null);
    const { updateData } = useUpdateData();
    const router = useRouter();
    const { uploadImage } = useImageUpload();
    const { deleteData } = useDeleteData();
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const dispatch = useDispatch();

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'File must be an image',
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
            return false;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await uploadImage("upload-image", formData);
            setSelectedBanner({ ...selectedBanner, imageUrl: res.data.url }); // Update selectedBanner with new image URL
            return res.data.url;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Failed to upload image, check the size/format of the image and try again',
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
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bannerData = {
            name: e.target.name.value,
            imageUrl: selectedBanner.imageUrl // Include updated imageUrl from selectedBanner
        };

        if (!bannerData.name) {
            Swal.fire({
                icon: 'error',
                title: 'Update Banner Failed',
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

        handleUpdate(bannerData);
    };

    const handleUpdate = async (data) => {
        try {
            const res = await updateData(`update-banner/${selectedBanner.id}`, data);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Success',
                    text: 'You have successfully updated your Banner',
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
                    setSelectedBanner(null); // Close the modal
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

    const handleDelete = async (bannerId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteData('delete-banner', bannerId); // Panggil deleteData dengan endpoint dan bannerId
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Your banner has been deleted.',
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
                            refetch(); // Call the refetch function after successful delete
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Failed',
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
            }
        });
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((item, index) => (
                <div className={`bg-white rounded-lg overflow-hidden ${darkMode ? 'shadow-BS7' : 'shadow-BS6'}`} key={index}>
                    <div className="relative">
                        {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt="Banner Image"
                                className="w-full aspect-video"
                            />
                        ) : (
                            <i className="fas fa-user text-2xl text-gray-300"></i>
                        )}
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button className="bg-primary w-10 h-10 rounded-full flex items-center justify-center" onClick={() => setSelectedBanner(item)}>
                                <IconEditCircle className="text-xl text-zinc-100" />
                            </button>
                            <button className="bg-primary w-10 h-10 rounded-full flex items-center justify-center" onClick={() => handleDelete(item.id)}>
                                <IconTrash className="text-xl text-zinc-100" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary p-4 h-full">
                        <h3 className="text-lg font-semibold text-zinc-100">{item.name}</h3>
                        <div className="mt-2">
                            <div className="flex items-center space-x-2">
                                <IconCalendarPlus className="text-lg text-zinc-100" />
                                <span className='text-zinc-100'>Created: {formatDate(item.createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                                <IconCalendarTime className="text-lg text-zinc-100" />
                                <span className='text-zinc-100'>Updated: {formatDate(item.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal for updating banner */}
            {selectedBanner && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pt-1 lg:pt-20 pl-16 pr-2 lg:px-0 ">
                    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md overflow-auto">
                        <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center justify-center">
                                <FaPenToSquare className="text-2xl font-bold text-center text-primary mr-2" />
                                <h2 className="text-2xl font-bold text-center text-primary font-podkova">Edit Banner</h2>
                            </div>
                            <button type="button" className="text-zinc-500 hover:text-zinc-800" onClick={() => setSelectedBanner(null)}>
                                <IoClose className='text-3xl' />
                            </button>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-center">
                                <div className="w-100 h-52 overflow-hidden bg-zinc-200 ">
                                    {selectedBanner.imageUrl ? (
                                        <img
                                            src={selectedBanner.imageUrl}
                                            alt="Banner Picture"
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <FaUser className="text-2xl text-zinc-100" />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-1 text-sm font-medium text-primary font-hind">Name</label>
                                <input type="text" id="name" name="name" defaultValue={selectedBanner.name} className="w-full px-3 py-2 border border-zinc-300 rounded font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block mb-1 text-sm font-medium text-primary font-hind">Banner Picture</label>
                                <input type="file" id="imageUrl" name="imageUrl" className="w-full px-3 py-2 border border-zinc-300 rounded font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" onChange={handleUpload} />
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 font-nunito">Update</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
