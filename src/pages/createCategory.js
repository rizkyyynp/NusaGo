import LayoutAdmin from "@/layouts/LayoutAdmin";
import { checkAuthAdmin } from '../utils/adminAuth';
import useImageUpload from '@/hooks/useImageUpload';
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import useCreateData from "@/hooks/useCreateData";
import { fetchCategories } from '@/lib/api';
import React from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function CreateCategory() {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const [imageUrl, setImageUrl] = useState(null);
    const { uploadImage } = useImageUpload();
    const { createData } = useCreateData();
    const router = useRouter();

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
            setImageUrl(res.data.url);
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

    const handleCreate = async (data) => {
        const res = await createData('create-category', data);
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Create Data Success',
                text: 'You have successfully added a new category',
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
                router.push('/dashCategory');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Add Data Failed',
                text: res.response?.data.message || 'Something went wrong',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: e.target.name.value,
            imageUrl
        };

        for (const key in userData) {
            if (userData[key] === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Add Data Failed',
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

        if (!imageUrl) {
            Swal.fire({
                icon: 'error',
                title: 'Add Data Failed',
                text: 'Please upload your category picture',
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

        handleCreate(userData);
    };

    return (
        <LayoutAdmin>
            <div className={`flex items-center justify-center  z-50 py-10 lg:pt-24 pl-16 pr-2 lg:px-0 min-h-screen ${darkMode ? 'bg-dark1 bg-opacity-80' : 'bg-black bg-opacity-50'} `}>
                <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center justify-center">
                            <i className="fas fa-pen-to-square text-2xl font-bold text-center text-primary mr-2"></i>
                            <h2 className="text-2xl font-bold text-center text-primary font-podkova">Create Category</h2>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className=" w-full">
                            <div className="">
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt="Banner Picture"
                                        className="w-full h-37.5 object-cover"
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-primary font-hind">Name</label>
                            <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-zinc-300 rounded font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block mb-1 text-sm font-medium text-primary font-hind">Category Picture</label>
                            <input type="file" id="imageUrl" name="imageUrl" className="w-full px-3 py-2 border border-zinc-300 rounded font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" onChange={handleUpload} />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 font-nunito">Create</button>
                    </div>
                </form>
            </div>
        </LayoutAdmin>
    );
}
