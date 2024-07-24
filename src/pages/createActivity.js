import LayoutAdmin from "@/layouts/LayoutAdmin";
import useImageUpload from "@/hooks/useImageUpload";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useCreateData from "@/hooks/useCreateData";
import { checkAuthAdmin } from '../utils/adminAuth';
import { fetchCategories } from '@/lib/api';
import Link from "next/link";
import React from 'react';
import { useSelector } from 'react-redux';


export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function CreateActivity() {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const [imageUrls, setImageUrls] = useState(null);
    const [locationMaps, setLocationMaps] = useState("");
    const { uploadImage } = useImageUpload();
    const { createData } = useCreateData();
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        categoryId: '',
    });
    useEffect(() => {
        async function loadCategories() {
            const categoryData = await fetchCategories();
            setCategories(categoryData);
        }

        loadCategories();
    }, []);

    const handleUpload = async (e) => {
        const files = e.target.files;
        if (files.length === 0) return;

        const uploadedUrls = [];
        for (const file of files) {
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
                continue;
            }

            const formData = new FormData();
            formData.append("image", file);
            try {
                const res = await uploadImage("upload-image", formData);
                uploadedUrls.push(res.data.url);
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
        }

        if (uploadedUrls.length > 0) {
            setImageUrls(uploadedUrls);
        }
    };

    const handleCreate = async (data) => {
        try {
            const res = await createData('create-activity', data);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Create Activity Success',
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
                    router.push('/dashActivity');
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Add Data Failed',
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
            console.log('Error Response:', error.response?.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            title: e.target.title.value,
            categoryId: e.target.categoryId.value,
            description: e.target.description.value,
            price: Number(e.target.price.value),
            price_discount: Number(e.target.price_discount.value),
            rating: e.target.rating.value,
            total_reviews: Number(e.target.total_reviews.value),
            facilities: e.target.facilities.value,
            address: e.target.address.value,
            province: e.target.province.value,
            city: e.target.city.value,
            location_maps: e.target.location_maps.value,
            imageUrls: imageUrls || []  // Ensure it's an array
        };

        for (const key in userData) {
            if (userData[key] === "" && key !== "imageUrls") {
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

        if (userData.imageUrls.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Add Data Failed',
                text: 'Please upload your activity picture',
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
            <div className={`max-w-4xl mx-auto p-6 rounded-lg border py-10 lg:my-24 pl-16 pr-2 lg:px-0 ${darkMode ? 'bg-dark1 shadow-BS3' : 'bg-zinc-100'} min-h-screen`}>
                <h2 className="text-2xl font-bold text-center mb-6 text-primary">Create Activity</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Title</span>
                            <input type="text" className="mt-1 block w-full border border-border rounded-md p-2" placeholder="Title" name="title" />
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Category</span>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Description</span>
                            <textarea className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="Description" name="description"></textarea>
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Price</span>
                            <input type="number" className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="Price" name="price" />
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Price Discount</span>
                            <input type="text" className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="Price Discount" name="price_discount" />
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Rating</span>
                            <select
                                name="rating" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                            >
                                <option value="1">
                                    1
                                </option>
                                <option value="2">
                                    2
                                </option>
                                <option value="3">
                                    3
                                </option>
                                <option value="4">
                                    4
                                </option>
                                <option value="5">
                                    5
                                </option>
                            </select>
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Total Review</span>
                            <input type="number" className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="Total Review" name="total_reviews" />
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Facilities</span>
                            <input type="text" className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="Facilities" name="facilities" />
                        </label>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-center">
                            {imageUrls && (
                                <img
                                    src={imageUrls}
                                    alt="imageUrls"
                                    width={200}
                                    height={150}
                                />
                            )}
                        </div>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Image Files</span>
                            <input type="file" className={`mt-1 block w-full border border-border rounded-md p-2 ${darkMode ? 'text-secondary' : 'text-primary'} `}name="imageUrls" placeholder="Upload Profile Picture" onChange={handleUpload} />
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Address</span>
                            <textarea className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="Address" name="address"></textarea>
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>City</span>
                            <input type="text" className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="City" name="city" />
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Province</span>
                            <input type="text" className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="Province" name="province" />
                        </label>
                        <label className="block">
                            <span className={`${darkMode ? 'text-secondary' : 'text-primary'}`}>Maps</span>
                            <textarea className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" placeholder="Maps" name="location_maps" onChange={(e) => setLocationMaps(e.target.value)}></textarea>
                        </label>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-center space-x-4 mt-6 w-full px-10 lg:px-0">
                        {locationMaps && (
                            <div
                                dangerouslySetInnerHTML={{ __html: locationMaps }}
                                className="rounded-b-xl object-cover "
                            />
                        )}
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-center space-x-4 mt-6">
                        <button type="submit" className="bg-primary text-zinc-100 hover:bg-primary/80 px-4 py-2 rounded-md">Create</button>
                        <Link href={"/dashActivity"}>
                        <button type="button" className="bg-red-600 text-zinc-100 hover:bg-red-600/80 px-4 py-2 rounded-md">Back</button>
                        </Link>
                        
                    </div>
                </form>
            </div>
        </LayoutAdmin>
    )
}