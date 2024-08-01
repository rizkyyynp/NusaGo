import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import NusaIcon from "../../assets/images/nusago.png";
import useAuth from "@/hooks/useAuth";
import defaultProfile from "../../assets/images/profile.png";
import ToggleSwitch from "../Toggle/ToggleSwitch";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { disableDarkMode } from "@/redux/slices/darkModeSlice";

export default function Navbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [profile, setProfile] = useState({ name: "", profilePictureUrl: "" });
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    const { userLog } = useAuth();
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
            userLog('user', (data) => {
                setProfile({
                    name: data.name,
                    profilePictureUrl: data.profilePictureUrl || "/default-profile.png",
                });
                setIsAdmin(data.role === 'admin');
            });
        }
    }, []);


    const handleProfileToggle = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        userLog('logout', () => {
            setIsLoggedIn(false);
            dispatch(disableDarkMode());
            router.push('/login');
        });
    };

    return (
        <div>
            {/* SideBar */}
            <div className="lg:hidden flex z-100 fixed">
                <div className={`${isSidebarOpen ? 'w-64' : 'w-14'} ${darkMode ? 'blurSidebar2' : 'blurSidebar'} h-screen flex justify-between flex-col p-2 transition-all duration-300 ease-in-out`}>
                    <div>
                        <div className="flex items-center justify-between p-2">
                            {!isSidebarOpen && (
                                <div className="text-lg font-bold flex items-center">
                                    <Image src={NusaIcon} alt="NusaGo Logo" width={30} height={30} />
                                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="ml-1 bg-secondary rounded-full h-10 w-10 flex items-center justify-center" aria-label="Button to Expand Sidebar">
                                        <i className="fas fa-maximize text-lg text-zinc-100 z-100 p-2 rounded-lg"></i>
                                    </button>
                                </div>
                            )}
                            {isSidebarOpen && (
                                <div className="text-lg font-bold flex items-center">
                                    <Image src={NusaIcon} alt="NusaGo Logo" width={24} height={24} />
                                    <span className="text-xl font-extrabold text-transparent bg-clip-text bg-primary-gradient font-podkova ml-2">
                                        NusaGo
                                    </span>
                                    <div className="ml-8">
                                        <ToggleSwitch />
                                    </div>
                                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="ml-6 bg-secondary rounded-full h-10 w-10 flex items-center justify-center" aria-label="Button to Minimize Sidebar">
                                        <i className="fas fa-minimize text-lg text-zinc-100 z-100 p-2 rounded-lg"></i>
                                    </button>
                                </div>
                            )}
                        </div>

                        <ul className="mt-2 space-y-1 font-hind">
                            <li>
                                {isLoggedIn ? (
                                    <Link href="/profile" title="Profile" className="flex items-center bg-secondary rounded hover:bg-primary">
                                        {profile.profilePictureUrl ? (
                                            <Image src={profile.profilePictureUrl} alt="Profile Picture" width={40} height={40} />
                                        ) : (
                                            <i className="fas fa-user text-2xl text-zinc-100"></i>
                                        )}
                                        <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>{profile.name}</span>
                                    </Link>
                                ) : (
                                    <Link href="/login" title="Login" className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                        <i className="fas fa-user text-2xl text-zinc-100"></i>
                                        <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Login Now!</span>
                                    </Link>
                                )}
                            </li>
                            <li>
                                <Link href="/" title="Home" className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                    <i className="fas fa-home text-2xl text-zinc-100"></i>
                                    <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/promo" title="Promo" className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                    <i className="fas fa-tags text-2xl text-zinc-100"></i>
                                    <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Promo</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/activity" title="Activity" className="flex items-center p-1 bg-secondary rounded hover:bg-primary">
                                    <i className="fas fa-plane-departure text-2xl text-zinc-100"></i>
                                    <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Activity</span>
                                </Link>
                            </li>
                            {isAdmin && (
                                <li className="relative">
                                    <Link href="/dashUser" title="Dashboard" className="flex items-center p-2 w-full bg-secondary rounded hover:bg-primary">
                                            <i className="fas fa-folder-open text-2xl text-zinc-100"></i>
                                            <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Dashboard</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul className="mb-2 space-y-2 font-hind">
                            {isLoggedIn ? (
                                <li className="flex items-center p-2 bg-secondary rounded hover:bg-primary" title="Logout">
                                    <button onClick={handleLogout} className="flex items-center w-full" aria-label=" Button Logout">
                                        <i className="fas fa-door-open text-2xl text-zinc-100"></i>
                                        <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Logout</span>
                                    </button>
                                </li>
                            ) : (
                                <li className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                    <Link href="/login" title="Login" className="flex items-center w-full">
                                        <i className="fas fa-lock text-2xl text-zinc-100"></i>
                                        <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Login</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>


            {/* Navbar Desktop */}
            <div className="hidden lg:flex">
                <header className={`${darkMode ? 'bg-dark1 shadow-BS5' : 'bg-zinc-100 shadow-lg'} flex items-center justify-around h-15 fixed w-full shadow-md z-100 transition-all duration-300`}>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Image src={NusaIcon} alt="NusaGo Logo" width={40} height={40} />
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-primary-gradient font-podkova">NusaGo</h1>
                    </div>
                    <div>
                        <nav className="flex gap-5 font-nunito">
                            <Link href="/" className={`${darkMode ? 'text-secondary after:bg-secondary' : 'text-primary after:bg-primary'} relative inline-block font-bold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2  after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}>Home</Link>
                            <Link href="/activity" className={`${darkMode ? 'text-secondary after:bg-secondary' : 'text-primary after:bg-primary'} relative inline-block font-bold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2  after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}>Activity</Link>
                            <Link href="/promo" className={`${darkMode ? 'text-secondary after:bg-secondary' : 'text-primary after:bg-primary'} relative inline-block font-bold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2  after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}>Promo</Link>
                            {isAdmin && (
                                <div className="relative">
                                    <Link href={'/dashUser'} className={`${darkMode ? 'text-secondary after:bg-secondary' : 'text-primary after:bg-primary'} relative inline-block font-bold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2  after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}>
                                        Dashboard
                                    </Link>

                                </div>
                            )}
                        </nav>
                    </div>

                    <div className="flex items-center">
                        <ToggleSwitch />
                        {isLoggedIn ? (
                            <div className="relative font-nunito">
                                <button
                                    onClick={handleProfileToggle}
                                    className="relative flex items-center"
                                    aria-controls="profile-menu"
                                >
                                    {profile.profilePictureUrl ? (
                                        <Image
                                            src={profile.profilePictureUrl}
                                            alt="Profile Picture"
                                            className="rounded-full"
                                            width={40}
                                            height={40}
                                        />
                                    ) : (
                                        <Image src={defaultProfile} alt="Profile Picture" className="rounded-full"
                                            width={40}
                                            height={40}
                                        />
                                    )}
                                    <span className={`${darkMode ? 'text-secondary' : 'text-primary'} ml-1 font-bold`}>{profile.name}</span>
                                    <i className={`${darkMode ? 'text-secondary' : 'text-primary'} fas fa-caret-down ml-2`}></i>
                                </button>
                                {isProfileOpen && (
                                    <ul className={`${darkMode ? 'bg-dark1' : 'bg-white'} absolute -right-4 mt-2 w-48  shadow-lg rounded-md overflow-hidden z-10`} id="profile-menu">
                                        <li>
                                            <Link href="/profile" className={`${darkMode ? 'text-secondary hover:bg-secondary hover:text-zinc-100' : 'text-primary hover:bg-gray-100'} block px-4 py-2 text-sm  font-bold`}>
                                                <p>Profile</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className={`${darkMode ? 'text-secondary hover:bg-secondary hover:text-zinc-100' : 'text-primary hover:bg-gray-100'} w-full text-left block px-4 py-2 text-sm  font-bold`}
                                                aria-label="Button Logout"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="text-zinc-100 font-bold bg-primary-gradient px-6 py-2 rounded-full">Login</Link>
                        )}
                    </div>
                </header>
            </div>
        </div>

    );
}
