import { useEffect, useState } from 'react';
import { fetchActivities, fetchCategories, fetchActivitiesByCategory } from '@/lib/api';
import useImageUpload from "@/hooks/useImageUpload";
import useUpdateData from '@/hooks/useUpdateData';
import useDeleteData from '@/hooks/useDeleteData';
import Swal from 'sweetalert2';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import {
    IconCalendarPlus,
    IconCalendarTime,
    IconEditCircle,
    IconTrash,
} from '@tabler/icons-react';

export default function CardActivity({ currentPage, setCurrentPage, setPageCount, setItems, items }) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const { uploadImage } = useImageUpload();
    const { updateData } = useUpdateData();
    const { deleteData } = useDeleteData();
    const [loading, setLoading] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
        price_discount: '',
        categoryId: '',
        imageUrls: [],
        city: '',
        province: '',
        rating: '',
        total_reviews: '',
        facilities: '',
        address: '',
        location_maps: '',
    });
    const itemsPerPage = 6;

    useEffect(() => {
        async function loadCategories() {
            const categoryData = await fetchCategories();
            setCategories(categoryData);
        }

        loadCategories();
    }, []);

    const loadActivities = async () => {
        setLoading(true);
        setShowContent(false); // Hide content during loading
        let data;
        if (selectedCategory === 'all') {
            data = await fetchActivities();
        } else {
            data = await fetchActivitiesByCategory(selectedCategory);
        }
        setItems(data);
        setPageCount(Math.ceil(data.length / itemsPerPage));
        setLoading(false);

        // Delay showing content to reduce flicker
        setTimeout(() => setShowContent(true), 500); // Adjust timeout duration if needed
    };

    useEffect(() => {
        loadActivities();
    }, [selectedCategory, currentPage]);


    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
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
            setFormData({ ...formData, imageUrls: res.data.url });
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

    const paginateItems = (items) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    const handleEditClick = (item) => {
        setFormData(item);
        setIsModalOpen(true);
        setCurrentStep(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            if (formData.title && formData.categoryId && formData.description && formData.price && formData.price_discount) {
                setCurrentStep(2);
            } else {
                alert("Please fill in all the fields in this section.");
            }
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(1);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const activityData = {
            title: formData.title,
            imageUrls: formData.imageUrls,
            description: formData.description,
            price: Number(formData.price),
            price_discount: Number(formData.price_discount),
            categoryId: formData.categoryId,
            city: formData.city,
            province: formData.province,
            rating: Number(formData.rating),
            total_reviews: Number(formData.total_reviews),
            facilities: formData.facilities,
            address: formData.address,
            location_maps: formData.location_maps
        };

        // Validation check for all required fields
        if (!activityData.title || !activityData.imageUrls || !activityData.description || !activityData.price || !activityData.price_discount || !activityData.categoryId || !activityData.city || !activityData.province || !activityData.rating || !activityData.total_reviews || !activityData.facilities || !activityData.address || !activityData.location_maps) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Please fill all required fields',
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

        handleUpdate(activityData);
    };


    const handleUpdate = async (data) => {
        try {
            const res = await updateData(`update-activity/${formData.id}`, data);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Success',
                    text: 'Update Activity Successfully',
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
                    setIsModalOpen(false);
                    setCurrentStep(1);
                    loadActivities();
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

    const handleDelete = async (activityId) => {
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
                    const res = await deleteData('delete-activity', activityId);
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Your Activity has been deleted.',
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
                            loadActivities();
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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset page when category changes
    };

    const isValidImageUrl = (url) => {
        return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
    };


    return (
        <>
            <div className="flex justify-center lg:justify-end mb-4">
                <select
                    className={`${darkMode ? 'bg-primary' : 'bg-secondary'} border-2 border-input rounded p-2 font-podkova border-zinc-100  text-zinc-100`}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="all" className='bg-zinc-100 text-primary'>All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id} className='bg-zinc-100 text-primary'>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginateItems(items).length > 0 ? (
                        paginateItems(items).map((item, index) => (
                            <div className={`bg-white rounded-lg overflow-hidden ${darkMode ? 'shadow-BS7' : 'shadow-BS6'} cursor-pointer`} key={index}>
                                <div className="relative">
                                <div className='overflow-hidden' style={{ width: '100%', height: '200px' }}>
                                        {isValidImageUrl(item.imageUrls[0]) ? (
                                            <Image
                                                src={item.imageUrls[0]}
                                                alt={item.title}
                                                layout='fill'
                                                className="transition-transform duration-300 hover:scale-110 object-cover object-center"
                                                objectFit='cover'
                                                quality={100}
                                                priority={true}
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                                                <span className="text-gray-500">Image not available</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute top-2 flex items-center justify-between w-full px-2">
                                        <div className="flex space-x-2">
                                            <button className="bg-primary flex items-center justify-center w-10 h-10 rounded-full" onClick={() => handleEditClick(item)}>
                                            <IconEditCircle className="text-xl text-zinc-100" />
                                            </button>
                                            <button className="bg-primary flex items-center justify-center w-10 h-10 rounded-full" onClick={() => handleDelete(item.id)}>
                                            <IconTrash className="text-xl text-zinc-100" />
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-1 bg-white rounded-full p-1">
                                            <span className="text-yellow-500 text-xs"><i className="fas fa-star"></i></span>
                                            <span className="text-base font-semibold text-primary font-hind">{item.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-1 flex justify-between items-end">
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary font-hind">{item.title}</h3>
                                        <p className="text-primary font-nunito">
                                            <i className="fas fa-map-marker-alt text-primary mr-1"></i>
                                            {item.city}</p>
                                        <p className="text-primary font-nunito"><i className="fas fa-map-marker-alt text-primary mr-1"></i>{item.province}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="line-through text-primary font-nunito">Rp {formatPrice(item.price)}</p>
                                        <p className="text-primary font-bold font-nunito">Rp {formatPrice(item.price_discount)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-zinc-100">No activities found for the selected category.</p>
                    )}

                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100  lg:pt-4 pl-16 pr-2 lg:px-0  h-screen overflow-y-auto ">
                    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md ">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center justify-center">
                                <i className="far fa-user text-2xl font-bold text-center text-primary mr-2"></i>
                                <h2 className="text-2xl font-bold text-center text-primary font-podkova">Edit Activity</h2>
                            </div>
                            <button
                                type="button"
                                className="text-zinc-100 bg-primary py-2 px-3 rounded-full focus:outline-none"
                                onClick={handleCloseModal}
                            >
                                <i className='fas fa-times'></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-primary">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-primary">Category</label>
                                            <select
                                                name="categoryId"
                                                value={formData.categoryId}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                            >
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-primary">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-primary">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-primary">Discounted Price</label>
                                            <input
                                                type="number"
                                                name="price_discount"
                                                value={formData.price_discount}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {currentStep === 2 && (
                                <>
                                    <div className='scrollable-form'>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="file" name="imageUrls" id="imageUrls" onChange={handleUpload} className="w-full p-2 border rounded-md font-nunito" placeholder="Upload Profile Picture" />
                                            {formData.imageUrls ? (
                                                <div>
                                                    <img
                                                        src={formData.imageUrls}
                                                        alt="imageUrls"
                                                        width={100}
                                                    />
                                                </div>
                                            ) : (
                                                <i className="fas fa-user text-2xl text-zinc-100"></i>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-primary">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-primary">Province</label>
                                                <input
                                                    type="text"
                                                    name="province"
                                                    value={formData.province}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                                />
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-primary">Rating</label>
                                                <select
                                                    name="rating" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary" onChange={handleInputChange} value={formData.rating}
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
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-primary">Total Reviews</label>
                                                <input
                                                    type="number"
                                                    name="total_reviews"
                                                    value={formData.total_reviews}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-primary">Facilities</label>
                                            <input
                                                type="text"
                                                name="facilities"
                                                value={formData.facilities}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-primary">Address</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-primary">Location Maps</label>
                                            <textarea
                                                name="location_maps"
                                                value={formData.location_maps}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-primary"
                                            />
                                            <div className="w-10">
                                                {formData?.location_maps && (
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: formData.location_maps }}
                                                        className="rounded-b-xl object-cover w-4 h-4 "
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between mt-2 ">
                                {currentStep === 2 && (
                                    <button
                                        type="button"
                                        className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
                                        onClick={handlePreviousStep}
                                    >
                                        Previous
                                    </button>
                                )}

                                {currentStep === 1 && (
                                    <button
                                        type="button"
                                        className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
                                        onClick={handleNextStep}
                                    >
                                        Next
                                    </button>
                                )}
                                {currentStep === 2 && (
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700"
                                    >
                                        Update
                                    </button>
                                )}

                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    );
}
