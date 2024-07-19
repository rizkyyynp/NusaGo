import LayoutAdmin from "@/layouts/LayoutAdmin";
import { checkAuthAdmin } from '../utils/adminAuth';
import useImageUpload from '@/hooks/useImageUpload';
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import useCreateData from "@/hooks/useCreateData";

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function CreatePromo() {
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
                showConfirmButton: false
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
                    text: 'You have successfully added a new promo',
                    timer: 1500,
                    showConfirmButton: false
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
                showConfirmButton: false
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
                    showConfirmButton: false
                });
                return;
            }
        }

        if (!imageUrl) {
            Swal.fire({
                icon: 'error',
                title: 'Add Data Failed',
                text: 'Please upload your banner picture',
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

        handleCreate(userData);
    };

    return (
        <LayoutAdmin>
            <div className="flex items-center justify-center bg-black bg-opacity-50 z-50 py-10 lg:pt-24 pl-16 pr-2 lg:px-0">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-9/12 p-2 bg-white rounded-lg shadow-md max-h-screen h-3/4 overflow-y-auto">
                    <div className="space-y-4 mt-3">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Banner Picture"
                                className="w-150 h-400"
                            />
                        ) : (
                            <i className="fas fa-user text-2xl text-zinc-100"></i>
                        )}
                        <div>
                            <label htmlFor="imageUrl" className="block font-semibold">Image File</label>
                            <input type="file" id="imageUrl" name='imageUrl' className="w-full border border-primary rounded-lg p-2" onChange={handleUpload} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block font-semibold">Title</label>
                            <input type="text" id="title" name='title' className="w-full border border-primary rounded-lg p-2" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block font-semibold">Description</label>
                            <textarea type="text" id="description" name='description' className="w-full border border-primary rounded-lg p-2" />
                        </div>
                        <div>
                            <label htmlFor="terms_condition" className="block font-semibold">Terms & Conditions</label>
                            <input type="text" id="terms_condition" name='terms_condition' className="w-full border border-primary rounded-lg p-2" />
                        </div>
                        <div>
                            <label htmlFor="promo_code" className="block font-semibold">Promo Code</label>
                            <input type="text" id="promo_code" name='promo_code' className="w-full border border-primary rounded-lg p-2" />
                        </div>
                        <div>
                            <label htmlFor="minimum_claim_price" className="block font-semibold">Minimum Claim Price</label>
                            <input type="number" id="minimum_claim_price" name='minimum_claim_price' className="w-full border border-primary rounded-lg p-2" />
                        </div>
                        <div>
                            <label htmlFor="promo_discount_price" className="block font-semibold">Promo Discount Price</label>
                            <input type="number" id="promo_discount_price" name='promo_discount_price' className="w-full border border-primary rounded-lg p-2" />
                        </div>
                        <div className="flex justify-center items-center w-full space-x-4 mt-4">
                            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Create</button>
                        </div>

                    </div>
                </form>
            </div>
        </LayoutAdmin>
    );
}
