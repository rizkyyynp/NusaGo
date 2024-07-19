import React, { useState } from 'react';
import Swal from "sweetalert2";
import useProfileUpdate from "@/hooks/useProfileUpdate";
import { useRouter } from 'next/router';
import useImageUpload from "@/hooks/useImageUpload";
import useDeleteData from '@/hooks/useDeleteData'; // Import useDeleteData hook

export default function CardBanner({ banners }) {
    const [selectedBanner, setSelectedBanner] = useState(null);
    const { updateProfile } = useProfileUpdate();
    const router = useRouter();
    const { uploadImage } = useImageUpload();
    const { deleteData } = useDeleteData(); // Destructure deleteData from useDeleteData hook

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'File must be an image',
                timer: 1500,
                showConfirmButton: false
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
                showConfirmButton: false
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
                showConfirmButton: false
            });
            return;
        }

        handleUpdate(bannerData);
    };

    const handleUpdate = async (data) => {
        try {
            const res = await updateProfile(`update-banner/${selectedBanner.id}`, data);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Success',
                    text: 'You have successfully updated your Banner',
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
                            showConfirmButton: false
                        }).then(() => {
                            router.reload();
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Failed',
                        text: error.response?.data.message || 'Something went wrong',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            }
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banners.map((item, index) => (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden" key={index}>
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
                            <button className="bg-primary text-primary-foreground p-2 rounded-full" onClick={() => setSelectedBanner(item)}>
                                <img src="https://openui.fly.dev/openui/24x24.svg?text=✏️" alt="edit-icon" />
                            </button>
                            <button className="bg-primary text-primary-foreground p-2 rounded-full" onClick={() => handleDelete(item.id)}>
                                <img src="https://openui.fly.dev/openui/24x24.svg?text=🗑️" alt="delete-icon" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary text-primary-foreground p-4">
                        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                        <div className="mt-2">
                            <div className="flex items-center space-x-2">
                                <img src="https://openui.fly.dev/openui/24x24.svg?text=📅" alt="created-at-icon" className="w-4 h-4" />
                                <span>Created at: {item.createdAt}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                                <img src="https://openui.fly.dev/openui/24x24.svg?text=📅" alt="updated-at-icon" className="w-4 h-4" />
                                <span>Updated at: {item.updatedAt}</span>
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
                                <i className="fas fa-pen-to-square text-2xl font-bold text-center text-primary mr-2"></i>
                                <h2 className="text-2xl font-bold text-center text-primary font-podkova">Edit Banner</h2>
                            </div>
                            <button type="button" className="text-zinc-500 hover:text-zinc-800" onClick={() => setSelectedBanner(null)}>
                                <i className="fas fa-times"></i>
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
                                        <i className="fas fa-user text-2xl text-zinc-100"></i>
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
