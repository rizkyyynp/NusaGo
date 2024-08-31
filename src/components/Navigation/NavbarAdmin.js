"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink, SidebarLogout } from "@/components/ui/sidebar";
import {
    IconLogout2,
    IconUsersGroup,
    IconHome,
    IconLayoutCollage,
    IconCategory,
    IconPlaneTilt,
    IconReceipt2,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import NusaIcon from "../../assets/images/nusago.png";
import ToggleSwitch from "../Toggle/ToggleSwitch";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { disableDarkMode } from "@/redux/slices/darkModeSlice";
import { useRouter } from 'next/router';



export default function NavbarAdmin({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { userLog } = useAuth();
    const [profile, setProfile] = useState({ name: "", profilePictureUrl: "" });
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const dispatch = useDispatch();
    const router = useRouter();

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

    const handleLogout = () => {
        userLog('logout', () => {
            setIsLoggedIn(false);
            dispatch(disableDarkMode());
            router.push('/login');
        });
    };

    const links = [
        {
            label: "Home",
            href: "/",
            icon: (
                <IconHome className="text-primary dark:text-secondary h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "List Users",
            href: "/dashUser",
            icon: (
                <IconUsersGroup className="text-primary dark:text-secondary h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "List Banners",
            href: "/dashBanner",
            icon: (
                <IconLayoutCollage className="text-primary h-5 w-5 flex-shrink-0 dark:text-secondary" />
            ),
        },
        {
            label: "List Category",
            href: "/dashCategory",
            icon: (
                <IconCategory className="text-primary h-5 w-5 flex-shrink-0 dark:text-secondary" />
            ),
        },
        {
            label: "List Activity",
            href: "/dashActivity",
            icon: (
                <IconPlaneTilt className="text-primary h-5 w-5 flex-shrink-0 dark:text-secondary" />
            ),
        },
        {
            label: "List Promo",
            href: "/dashPromo",
            icon: (
                <IconReceipt2 className="text-primary h-5 w-5 flex-shrink-0 dark:text-secondary" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                className={cn(
                    " flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-y-auto",
                    "h-screen overflow-hidden"
                )}
            >
                <Sidebar open={open} setOpen={setOpen} className="md:flex-shrink-0">
                    <SidebarBody className="justify-between gap-10 md:flex md:flex-col">
                        <div className="flex flex-col flex-1  md:justify-start md:overflow-hidden">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2 md:overflow-hidden">
                                {links.map((link, idx) => (
                                    <SidebarLink key={idx} link={link} />
                                ))}
                                <SidebarLogout logouts={{ label: "Logout", icon: <IconLogout2 className="text-primary h-5 w-5 flex-shrink-0 dark:text-secondary" /> }} onClick={handleLogout} />
                            </div>
                        </div>
                        <div className="md:flex md:items-center md:justify-start md:mt-auto">
                            <SidebarLink
                                link={{
                                    label: `${profile.name}`,
                                    href: "/profile",
                                    icon: (
                                        <Image
                                            src={profile.profilePictureUrl}
                                            className="h-7 w-7 flex-shrink-0 rounded-full"
                                            width={50}
                                            height={50}
                                            alt="Avatar"
                                        />
                                    ),
                                }}
                            />
                        </div>
                    </SidebarBody>
                </Sidebar>
                <div className="flex-1 min-h-screen overflow-y-auto bg-white dark:bg-dark1">
                    {children}
                </div>

            </div>
        </>

    );
}
export const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <Link
                href="#"
                className="font-normal flex space-x-2 relative z-20"
            >
                <Image src={NusaIcon} alt="NusaGo Logo" width={32} height={32} />
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-transparent bg-clip-text bg-primary-gradient font-podkova
            text-2xl font-bold"
                >
                    NusaGo
                </motion.span>
            </Link>
            <ToggleSwitch />
        </div>

    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="flex items-center py-1"
        >
            <Image src={NusaIcon} alt="NusaGo Logo" width={32} height={32} />
        </Link>
    );
};


