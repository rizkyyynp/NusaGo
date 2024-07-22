import Layout from "@/layouts/Layout";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import useProfileUpdate from "@/hooks/useProfileUpdate";
import useImageUpload from "@/hooks/useImageUpload";

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({ name: "", profilePictureUrl: "", phoneNumber: "", email: "", role: "" });
    const [isEditing, setIsEditing] = useState(false);
    const { userLog } = useAuth();
    const { uploadImage } = useImageUpload();
    const { updateProfile } = useProfileUpdate();
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push('/login');
            return;
        }

        setIsLoggedIn(true);
        userLog("user", (data) => {
            setProfile({
                name: data.name,
                profilePictureUrl: data.profilePictureUrl || "/default-profile.png",
                phoneNumber: data.phoneNumber,
                email: data.email,
                role: data.role,
            });
        });
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCloseClick = () => {
        setIsEditing(false);
    };

    if (!isLoggedIn) {
        return null;
    }

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
            setProfile({ ...profile, profilePictureUrl: res.data.url });
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
        const userData = {
            name: e.target.name.value,
            email: e.target.email.value,
            profilePictureUrl: profile.profilePictureUrl,
            phoneNumber: e.target.phoneNumber.value,
        };
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
            const res = await updateProfile('update-profile', data);
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
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 pt-20 pb-20 pl-16 pr-2 lg:px-0 lg:pt-28">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center justify-center">
                            <i className="far fa-user text-2xl font-bold text-center text-primary mr-2"></i>
                            <h2 className="text-2xl font-bold text-center text-primary font-podkova">Profile Information</h2>
                        </div>
                        <button
                            type="button"
                            className="text-zinc-100 bg-primary py-2 px-3 rounded-full focus:outline-none"
                            onClick={handleEditClick}
                        >
                            <i className="fas fa-pen"></i>
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 overflow-hidden bg-zinc-200 rounded-full">
                            {profile.profilePictureUrl ? (
                                <img
                                    src={profile.profilePictureUrl}
                                    alt="Profile Picture"
                                    className="rounded-full w-24 h-24"
                                />
                            ) : (
                                <i className="fas fa-user text-2xl text-zinc-100"></i>
                            )}
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-primary font-hind">{profile.name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-primary font-hind">Email</label>
                            <input type="text" value={profile.email} className="w-full px-3 py-2 border border-zinc-300 rounded cursor-pointer font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" readOnly />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-primary font-hind">Role</label>
                            <input type="text" value={profile.role} className="w-full px-3 py-2 border border-zinc-300 rounded cursor-pointer font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" readOnly />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-primary font-hind">Phone Number</label>
                            <input type="text" value={profile.phoneNumber} className="w-full px-3 py-2 border border-zinc-300 rounded cursor-pointer font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" readOnly />
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pt-1 lg:pt-20 pl-16 pr-2 lg:px-0">
                    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center justify-center">
                                <i className="fas fa-pen-to-square text-2xl font-bold text-center text-primary mr-2"></i>
                                <h2 className="text-2xl font-bold text-center text-primary font-podkova">Profile Information</h2>
                            </div>
                            <button type="button" className="text-zinc-500 hover:text-zinc-800" onClick={handleCloseClick}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-center">
                                <div className="w-24 h-24  overflow-hidden bg-zinc-200 rounded-full">
                                    {profile.profilePictureUrl ? (
                                        <img
                                            src={profile.profilePictureUrl}
                                            alt="Profile Picture"
                                            className="rounded-full w-24 h-24"
                                        />
                                    ) : (
                                        <i className="fas fa-user text-2xl text-zinc-100"></i>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-1 text-sm font-medium text-primary font-hind">Name</label>
                                <input type="text" id="name" name="name" defaultValue={profile.name} className="w-full px-3 py-2 border border-zinc-300 rounded font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-primary font-hind">Email</label>
                                <input type="email" id="email" name="email" defaultValue={profile.email} className="w-full px-3 py-2 border border-zinc-300 rounded font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium text-primary font-hind">Phone Number</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" defaultValue={profile.phoneNumber} className="w-full px-3 py-2 border border-zinc-300 rounded font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" />
                            </div>
                            <div>
                                <label htmlFor="profilePictureUrl" className="block mb-1 text-sm font-medium text-primary font-hind">Profile Picture</label>
                                <input type="file" id="profilePictureUrl" name="profilePictureUrl" className="w-full px-3 py-2 border border-zinc-300 rounded font-nunito focus:outline-none focus:ring-primary focus:border-primary text-primary" onChange={handleUpload} />
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 font-nunito">Update</button>
                        </div>
                    </form>
                </div>
            )}
        </Layout>
    );
}
