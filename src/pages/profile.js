import Layout from "@/layouts/Layout";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({ name: "", profilePictureUrl: "", phoneNumber: "", email: "", role: "" });
    const { userLog } = useAuth();
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

    if (!isLoggedIn) {
        return null;
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 pt-20 pb-20 pl-16 pr-2 lg:px-0  lg:pt-28">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center mb-2">
                        <i className="far fa-user text-2xl font-bold text-center text-primary mr-2"></i>
                        <h2 className="text-2xl font-bold text-center text-primary">Profile Information</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 overflow-hidden bg-zinc-200 rounded-full">
                            {profile.profilePictureUrl ? (
                                <Image
                                    src={profile.profilePictureUrl}
                                    alt="Profile Picture"
                                    width={96}
                                    height={96}
                                    className="rounded-full"
                                />
                            ) : (
                                <i className="fas fa-user text-2xl text-zinc-100"></i>
                            )}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-zinc-800">{profile.name}</h3>
                        <button className="px-4 py-2 mb-6 text-white bg-green-600 rounded hover:bg-green-700">Edit Profile</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-zinc-700">email</label>
                            <input type="text" value={profile.email} className="w-full px-3 py-2 border border-zinc-300 rounded cursor-pointer" readOnly />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-zinc-700">role</label>
                            <input type="text" value={profile.role} className="w-full px-3 py-2 border border-zinc-300 rounded cursor-pointer" readOnly />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-zinc-700">phoneNumber</label>
                            <input type="text" value={profile.phoneNumber} className="w-full px-3 py-2 border border-zinc-300 rounded cursor-pointer" readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
