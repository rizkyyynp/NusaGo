import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import useImageUpload from '@/hooks/useImageUpload';
import useRegister from '@/hooks/useRegist';

export default function RegisterForm() {
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const { uploadImage } = useImageUpload();
    const { signup } = useRegister();
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
                position: 'top-right',
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
            setProfilePictureUrl(res.data.url);
            return res.data.url;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Failed to upload image, check the size/format of the image and try again',
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: 'top-right',
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: 'custom-timer-progress-bar-failed',
                    title: 'title-failed',
                },
            });
            console.log(error);
        }
    };

    const handleRegister = async (data) => {
        const res = await signup('register', data);
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Register Success',
                text: 'You have successfully registered',
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: 'custom-timer-progress-bar',
                    title: 'title-success',
                },
            }).then(() => {
                router.push('/login');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Register Failed',
                text: res.response?.data.message || 'Something went wrong',
                timer: 2000,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            passwordRepeat: e.target.passwordRepeat.value,
            role: e.target.role.value,
            profilePictureUrl: profilePictureUrl,
            phoneNumber: e.target.phoneNumber.value,
        };
        for (const key in userData) {
            if (userData[key] === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Register Failed',
                    text: 'Please fill all the fields',
                    timer: 1500,
                    showConfirmButton: false
                });
                return;
            }
        }
        if (userData.password !== userData.passwordRepeat) {
            Swal.fire({
                icon: 'error',
                title: 'Register Failed',
                text: 'Password does not match',
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
        if (!profilePictureUrl) {
            Swal.fire({
                icon: 'error',
                title: 'Register Failed',
                text: 'Please upload your profile picture',
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
        handleRegister(userData);
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" id="name" name="name" placeholder="Your Name" className="w-full p-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary text-primary placeholder-text-primary font-nunito" aria-label='Your Name' />
                <input type="email" id="email" name="email" placeholder="Your Email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary text-primary placeholder-text-primary font-nunito" aria-label='Your Email' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="password" placeholder="Password" id="password" name="password" className="w-full p-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary text-primary placeholder-text-primary font-nunito" aria-label='Your Password' />
                <input type="password" id="passwordRepeat" name="passwordRepeat" placeholder="Repeat Password" className="w-full p-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary text-primary placeholder-text-primary font-nunito" aria-label='Repeat Password' />
            </div>
            <input type="text" placeholder="Phone Number" id="phone" name="phoneNumber" className="w-full p-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary text-primary placeholder-text-primary font-nunito" aria-label='Phone Number' />
            <select id="select-role" name="role" className="w-full p-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary text-primary placeholder-text-primary font-nunito" aria-label='Select Role'>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="file" name="profilePictureUrl" id="profilePictureUrl" onChange={handleUpload} className="w-full p-2 border rounded-md font-nunito" placeholder="Upload Profile Picture" aria-label='Upload Profile Picture' />
                {profilePictureUrl && (
                    <div>
                        <img
                            src={profilePictureUrl}
                            alt="profilePictureUrl"
                            width={100}
                            height={100}
                        />
                    </div>
                )}
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-md transition-all duration-500 ease-in-out transform hover:scale-105 font-sans" aria-label='Button Register'>Register</button>
        </form>
    );
}
