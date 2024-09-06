import LayoutAdmin from "@/layout/LayoutAdmin";
import { checkAuthAdmin } from '../utils/adminAuth';
import useImageUpload from '@/hooks/useImageUpload';
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import useCreateData from "@/hooks/useCreateData";
import Link from "next/link";
import React from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function CreatePromo() {
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
        try {
            const res = await createData('create-promo', data);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Create Data Success',
                    text: 'Promo created successfully',
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
                    router.push('/dashPromo');
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
            description: e.target.description.value,
            terms_condition: e.target.terms_condition.value,
            promo_code: e.target.promo_code.value,
            promo_discount_price: Number(e.target.promo_discount_price.value),
            minimum_claim_price: Number(e.target.minimum_claim_price.value),
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
                text: 'Please upload your promo picture',
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
            <div className="flex items-center justify-center bg-dark1 bg-opacity-50 z-50 p-8 min-h-screen mt-16 md:mt-0">
                <form onSubmit={handleSubmit} className={`${darkMode ? 'bg-dark1 shadow-BS4' : 'bg-white shadow-md'} grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-9/12 p-2 rounded-lg  max-h-screen h-3/4 overflow-y-auto`}>
                    <div className="space-y-4 mt-3">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Banner Picture"
                                className="w-150 h-400"
                            />
                        )}
                        <div>
                            <label htmlFor="imageUrl" className="block font-semibold text-primary">Image File</label>
                            <input type="file" id="imageUrl" name='imageUrl' className="w-full border border-primary rounded-lg p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" onChange={handleUpload} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block font-semibold text-primary">Title</label>
                            <input type="text" id="title" name='title' className="w-full border border-primary rounded-lg p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block font-semibold text-primary">Description</label>
                            <textarea type="text" id="description" name='description' className="w-full border border-primary rounded-lg p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                        </div>
                        <div>
                            <label htmlFor="terms_condition" className="block font-semibold text-primary">Terms & Conditions</label>
                            <input type="text" id="terms_condition" name='terms_condition' className="w-full border border-primary rounded-lg p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                        </div>
                        <div>
                            <label htmlFor="promo_code" className="block font-semibold text-primary">Promo Code</label>
                            <input type="text" id="promo_code" name='promo_code' className="w-full border border-primary rounded-lg p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                        </div>
                        <div>
                            <label htmlFor="minimum_claim_price" className="block font-semibold text-primary">Minimum Claim Price</label>
                            <input type="number" id="minimum_claim_price" name='minimum_claim_price' className="w-full border border-primary rounded-lg p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                        </div>
                        <div>
                            <label htmlFor="promo_discount_price" className="block font-semibold text-primary">Promo Discount Price</label>
                            <input type="number" id="promo_discount_price" name='promo_discount_price' className="w-full border border-primary rounded-lg p-2 focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                        </div>
                        <div className="flex justify-center items-center w-full space-x-4 mt-4">
                            <button type="submit" className="bg-primary text-zinc-100 px-4 py-2 rounded-lg">Create</button>
                            <Link href={"/dashPromo"}>
                                <button type="button" className="bg-red-600 text-zinc-100 hover:bg-red-600/80 px-4 py-2 rounded-md">Back</button>
                            </Link>
                        </div>

                    </div>
                </form>
            </div>
        </LayoutAdmin>
    );
}
