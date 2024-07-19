import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import NusaIcon from "../../assets/images/nusago.png";
import useAuth from "@/hooks/useAuth";

export default function NavbarAdmin() {
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [profile, setProfile] = useState({ name: "", profilePictureUrl: "" });
    const router = useRouter();
    const { userLog } = useAuth();

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

    const handleDashboardToggle = () => {
        setIsDashboardOpen(!isDashboardOpen);
    };

    const handleProfileToggle = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        userLog('logout', () => {
            setIsLoggedIn(false);
            router.push('/login');
        });
    };

    return (
        <div>
            {/* SideBar */}
            <div className="lg:hidden flex z-100 fixed">
                <div className={`${isSidebarOpen ? 'w-64' : 'w-14'} bg-zinc-300 h-screen flex justify-between flex-col p-2 transition-all duration-300 ease-in-out`}>
                    <div>
                        <div className="flex items-center justify-between p-2">
                            {/* Bagian untuk tampilan minimize */}
                            {!isSidebarOpen && (
                                <div className="text-lg font-bold flex items-center">
                                    <Image src={NusaIcon} alt="NusaGo Logo" width={30} height={30} />
                                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="-,l-1 bg-zinc-100 rounded-full h-10 w-10 flex items-center justify-center">
                                        <i className="fas fa-maximize text-lg text-primary z-100 p-2 rounded-lg"></i>
                                    </button>
                                </div>
                            )}

                            {/* Bagian untuk tampilan maximize */}
                            {isSidebarOpen && (
                                <div className="text-lg font-bold  flex items-center">
                                    <Image src={NusaIcon} alt="NusaGo Logo" width={24} height={24} />
                                    <span className="text-xl font-extrabold text-transparent bg-clip-text bg-primary-gradient font-podkova ml-2">
                                        NusaGo
                                    </span>
                                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="ml-6 bg-zinc-100 rounded-full h-10 w-10 flex items-center justify-center">
                                        <i className="fas fa-minimize text-lg text-primary z-100 p-2 rounded-lg"></i>
                                    </button>
                                </div>
                            )}
                        </div>

                        <ul className="mt-2 space-y-1 font-hind">

                            <li>
                                <Link href={'/profile'} className="flex items-center  bg-secondary rounded hover:bg-primary">
                                    {profile.profilePictureUrl ? (
                                        <img
                                            src={profile.profilePictureUrl || "/default-profile.png"}
                                            alt="Profile Picture"
                                            className=" w-10 h-10"
                                        />
                                    ) : (
                                        <i className="fas fa-user text-2xl text-zinc-100"></i>
                                    )}
                                    <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>{profile.name}</span>
                                </Link>
                            </li>
                            <Link href={'/'} className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                <i className="fas fa-home text-2xl text-zinc-100"></i>
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Home</span>
                            </Link>
                            <Link href={'/dashUser'} className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                <i className="fas fa-user text-2xl text-zinc-100"></i>
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>User</span>
                            </Link>
                            <Link href={'/dashPromo'} className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                <i className="fas fa-tags text-2xl text-zinc-100"></i>
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Promo</span>
                            </Link>
                            <Link href={'/dashActivity'} className="flex items-center p-1 bg-secondary rounded hover:bg-primary">
                                <i className="fas fa-plane-departure text-2xl text-zinc-100"></i>
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Activity</span>
                            </Link>
                            <Link href={'/dashCategory'} className="flex items-center p-1 bg-secondary rounded hover:bg-primary">
                                <i className="fas fa-list text-2xl text-zinc-100"></i>
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Category</span>
                            </Link>
                            <Link href={'/dashBanner'} className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                <i className="far fa-image text-2xl text-zinc-100"></i>
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Banner</span>
                            </Link>
                        </ul>
                    </div>
                    <div>
                        <ul className="mb-2 space-y-2 font-hind">
                            <li className="flex items-center p-2 bg-secondary rounded hover:bg-primary">
                                <button onClick={handleLogout} className="flex items-center w-full">
                                    <i className="fas fa-door-open text-2xl text-zinc-100"></i>
                                    <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 font-bold text-zinc-100`}>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Navbar Desktop */}
            <div className="hidden lg:flex">
                <header className="flex items-center justify-around h-15  fixed w-full shadow-md z-100 transition-all duration-300 bg-zinc-100">
                    <div className="flex items-center gap-1">
                        <Image src={NusaIcon} alt="NusaGo Logo" width={40} height={40} />
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-primary-gradient font-podkova">NusaGo</h1>
                    </div>
                    <div>
                        <nav className="flex gap-5 font-nunito">
                            <Link href="/" className="relative inline-block text-primary font-bold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Home</Link>
                                <div className="relative">
                                    <button
                                        onClick={handleDashboardToggle}
                                        className="relative inline-block text-primary font-bold text-lg transition-all duration-300 max-md:mt-5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 items-center"
                                    >
                                        Dashboard <i className="fas fa-caret-down ml-2"></i>
                                    </button>
                                    {isDashboardOpen && (
                                        <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-10 max-md:-left-32 max-md:w-96 max-md:flex ">
                                            <li>
                                                <Link href="/dashUser" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 font-bold">User</Link>
                                            </li>
                                            <li>
                                                <Link href="/dashActivity" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 font-bold">Activity</Link>
                                            </li>
                                            <li>
                                                <Link href="/dashBanner" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 font-bold">Banner</Link>
                                            </li>
                                            <li>
                                                <Link href="/dashCategory" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 font-bold">Category</Link>
                                            </li>
                                            <li>
                                                <Link href="/dashPromo" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 font-bold">Promo</Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                        </nav>
                    </div>

                    <div className="flex items-center">
                        {isLoggedIn ? (
                            <div className="relative font-nunito">
                                <button
                                    onClick={handleProfileToggle}
                                    className="relative flex items-center text-primary font-bold"
                                >
                                    {profile.profilePictureUrl ? (
                                        <img
                                            src={profile.profilePictureUrl || "/default-profile.png"}
                                            alt="Profile Picture"
                                            className="rounded-full w-8 h-8"
                                        />
                                    ) : (
                                        <i className="fas fa-user text-2xl text-primary"></i>
                                    )}
                                    <span className="ml-1 font-bold text-primary">{profile.name}</span>
                                    <i className="fas fa-caret-down ml-2"></i>
                                </button>
                                {isProfileOpen && (
                                    <ul className="absolute -right-4 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                                        <li>
                                            <Link href="/profile" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 font-bold">
                                                <p>Profile</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100 font-bold"
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
