import { useEffect, useState } from 'react';
import { fetchActivities, fetchCategories, fetchActivitiesByCategory} from '@/lib/api';
import useImageUpload from "@/hooks/useImageUpload";
import useUpdateData from '@/hooks/useUpdateData';
import useDeleteData from '@/hooks/useDeleteData';
import Swal from 'sweetalert2';
export default function CardActivity({ currentPage, setPageCount, setItems, items }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const { uploadImage } = useImageUpload();
    const { updateData } = useUpdateData();
    const { deleteData } = useDeleteData();
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
    const itemsPerPage = 3;

    useEffect(() => {
        async function loadCategories() {
            const categoryData = await fetchCategories();
            setCategories(categoryData);
        }

        loadCategories();
    }, []);

    const loadActivities = async () => {
        let data;
        if (selectedCategory === 'all') {
            data = await fetchActivities();
        } else {
            data = await fetchActivitiesByCategory(selectedCategory);
        }
        setItems(data);
        setPageCount(Math.ceil(data.length / itemsPerPage));
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
                showConfirmButton: false
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
                showConfirmButton: false
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
        if (!activityData.title || !activityData.imageUrls || !activityData.description|| !activityData.price || !activityData.price_discount || !activityData.categoryId || !activityData.city || !activityData.province || !activityData.rating || !activityData.total_reviews || !activityData.facilities || !activityData.address || !activityData.location_maps) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Please fill all required fields',
                timer: 1500,
                showConfirmButton: false
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
                    text: 'You have successfully updated your activity',
                    timer: 1500,
                    showConfirmButton: false
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
                showConfirmButton: false
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
                            showConfirmButton: false
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
                        showConfirmButton: false
                    });
                }
            }
        });
    };


    return (
        <div>
            <div className="flex justify-center mb-4">
                <select
                    className="border-2 border-input rounded p-2 mr-2 font-podkova border-zinc-100 bg-secondary text-zinc-100"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                {paginateItems(items).length > 0 ? (
                    paginateItems(items).map((item, index) => (
                        <div className="bg-zinc-100 rounded-lg overflow-hidden shadow-lg cursor-pointer" key={index}>
                            <div className="relative">
                                <img
                                    src={item.imageUrls}
                                    alt={item.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                                    aria-hidden="true"
                                />
                                <div className="absolute top-2 flex items-center justify-between w-full px-2">
                                    <div className="flex space-x-2">
                                        <button className="bg-primary text-primary-foreground p-2 rounded-full" onClick={() => handleEditClick(item)}>
                                            <img src="https://openui.fly.dev/openui/24x24.svg?text=✏️" alt="edit-icon" />
                                        </button>
                                        <button className="bg-primary text-primary-foreground p-2 rounded-full" onClick={() => handleDelete(item.id)}>
                                            <img src="https://openui.fly.dev/openui/24x24.svg?text=🗑️" alt="delete-icon" />
                                        </button>
                                    </div>
                                    <div className="flex items-center space-x-1 bg-white rounded-full p-1">
                                        <span className="text-yellow-500 text-xs"><i className="fa-solid fa-star"></i></span>
                                        <span className="text-base font-bold font-hind">{item.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-1 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-primary font-hind">{item.title}</h3>
                                    <p className="text-primary font-nunito"><i className="fas fa-map-marker-alt text-primary mr-1"></i>{item.city}, {item.province}</p>
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

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pt-1 lg:pt-20 pl-16 pr-2 lg:px-0">
                    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md overflow-auto">
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
                                <i className="fas fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <select
                                                name="categoryId"
                                                value={formData.categoryId}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
                                            <input
                                                type="number"
                                                name="price_discount"
                                                value={formData.price_discount}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {currentStep === 2 && (
                                <>
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
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Province</label>
                                            <input
                                                type="text"
                                                name="province"
                                                value={formData.province}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                                            <input
                                                type="number"
                                                name="rating"
                                                value={formData.rating}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Total Reviews</label>
                                            <input
                                                type="number"
                                                name="total_reviews"
                                                value={formData.total_reviews}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Facilities</label>
                                        <input
                                            type="text"
                                            name="facilities"
                                            value={formData.facilities}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Address</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Location Maps</label>
                                        <textarea
                                            name="location_maps"
                                            value={formData.location_maps}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between">
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
        </div>
    );
}
