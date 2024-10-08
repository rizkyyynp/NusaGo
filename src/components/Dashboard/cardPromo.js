import React, { useState } from 'react';
import Swal from "sweetalert2";
import useUpdateData from '@/hooks/useUpdateData';
import { useRouter } from 'next/router';
import useImageUpload from "@/hooks/useImageUpload";
import useDeleteData from '@/hooks/useDeleteData';
import imageDefault from '../../assets/images/image.png';
import { useSelector } from 'react-redux';
import {
    IconCalendarPlus,
    IconCalendarTime,
    IconEditCircle,
    IconTrash,
} from '@tabler/icons-react';

export default function CardPromo({ promos, refetch }) {
    const [selectedPromo, setSelectedPromo] = useState(null);
    const { updateData } = useUpdateData();
    const router = useRouter();
    const { uploadImage } = useImageUpload();
    const { deleteData } = useDeleteData();
    const darkMode = useSelector((state) => state.darkMode.darkMode);

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
            setSelectedPromo({ ...selectedPromo, imageUrl: res.data.url });
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
        const promoData = {
            title: e.target.title.value,
            description: e.target.description.value,
            terms_condition: e.target.terms_condition.value,
            promo_code: e.target.promo_code.value,
            promo_discount_price: Number(e.target.promo_discount_price.value), // Convert to number
            minimum_claim_price: Number(e.target.minimum_claim_price.value),   // Convert to number
            imageUrl: selectedPromo.imageUrl
        };

        if (!promoData.title || !promoData.description || !promoData.terms_condition || !promoData.promo_code || !promoData.promo_discount_price || !promoData.minimum_claim_price) {
            Swal.fire({
                icon: 'error',
                title: 'Update Promo Failed',
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

        handleUpdate(promoData);
    };

    const handleUpdate = async (data) => {
        try {
            const res = await updateData(`update-promo/${selectedPromo.id}`, data);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Success',
                    text: 'Update Promo Successfully',
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
                    refetch();
                    setSelectedPromo(null);
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

    const handleDelete = async (promoId) => {
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
                    const res = await deleteData('delete-promo', promoId);
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Your Promo has been deleted.',
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
                            refetch();
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
            {promos.map((item, index) => (
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
                            <button className="bg-primary flex items-center justify-center w-10 h-10 rounded-full" onClick={() => setSelectedPromo(item)} >
                            <IconEditCircle className="text-xl text-zinc-100" />
                            </button>
                            <button className="bg-primary flex items-center justify-center w-10 h-10 rounded-full" onClick={() => handleDelete(item.id)}>
                            <IconTrash className="text-xl text-zinc-100" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary text-primary-foreground p-4">
                        <h3 className="text-lg font-semibold text-zinc-100">{item.title}</h3>
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

            {/* Modal for updating promo */}
            {selectedPromo && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100 pl-16 pr-2 lg:px-0">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-9/12 p-2 bg-white rounded-lg shadow-md max-h-screen h-3/4 overflow-y-auto">
                        <div className="space-y-4 mt-3">
                            {selectedPromo.imageUrl ? (
                                <img
                                    src={selectedPromo.imageUrl}
                                    alt="Banner Picture"
                                    className="w-150 h-400"
                                />
                            ) : (
                                <img
                                    src={imageDefault}
                                    alt="Banner Picture"
                                    className="w-150 h-400"/>
                            )}
                            <div>
                                <label htmlFor="imageUrl" className="block font-semibold text-primary">Image File</label>
                                <input type="file" id="imageUrl" name='imageUrl' className="w-full border border-primary rounded-lg p-2" onChange={handleUpload} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block font-semibold text-primary">Title</label>
                                <input type="text" id="title" name='title' className="w-full border border-primary rounded-lg p-2 text-primary" defaultValue={selectedPromo.title} />
                            </div>
                            <div>
                                <label htmlFor="description" className="block font-semibold text-primary">Description</label>
                                <textarea type="text" id="description" name='description' className="w-full border border-primary rounded-lg p-2 text-primary" defaultValue={selectedPromo.description} />
                            </div>
                            <div>
                                <label htmlFor="terms_condition" className="block font-semibold text-primary">Terms & Conditions</label>
                                <input type="text" id="terms_condition" name='terms_condition' className="w-full border border-primary rounded-lg p-2 text-primary" defaultValue={selectedPromo.terms_condition} />
                            </div>
                            <div>
                                <label htmlFor="promo_code" className="block font-semibold text-primary">Promo Code</label>
                                <input type="text" id="promo_code" name='promo_code' className="w-full border border-primary rounded-lg p-2 text-primary" defaultValue={selectedPromo.promo_code} />
                            </div>
                            <div>
                                <label htmlFor="minimum_claim_price" className="block font-semibold text-primary">Minimum Claim Price</label>
                                <input type="number" id="minimum_claim_price" name='minimum_claim_price' className="w-full border border-primary rounded-lg p-2 text-primary" defaultValue={selectedPromo.minimum_claim_price} />
                            </div>
                            <div>
                                <label htmlFor="promo_discount_price" className="block font-semibold text-primary">Promo Discount Price</label>
                                <input type="number" id="promo_discount_price" name='promo_discount_price' className="w-full border border-primary rounded-lg p-2 text-primary" defaultValue={selectedPromo.promo_discount_price} />
                            </div>
                            <div className="flex justify-center items-center w-full space-x-4 mt-4">
                                <button type="submit" className="bg-primary text-zinc-100 px-4 py-2 rounded-lg">Update</button>
                                <button type="button" className="border border-primary text-primary px-4 py-2 rounded-lg" onClick={() => setSelectedPromo(null)}>Cancel</button>
                            </div>

                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
