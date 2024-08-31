"use client";;
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import NusaIcon from "../../assets/images/nusago.png";
import { useSelector, useDispatch } from 'react-redux';
import { disableDarkMode } from "@/redux/slices/darkModeSlice";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import defaultProfile from "../../assets/images/profile.png";
import { IconLogout, IconLogin, IconUserCircle } from "@tabler/icons-react";

const SidebarContext = createContext(undefined);


export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        (<SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
            {children}
        </SidebarContext.Provider>)
    );
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate
}) => {
    return (
        (<SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>)
    );
};

export const SidebarBody = (props) => {
    return (<>
        <DesktopSidebar {...props} />
        <MobileSidebar {...(props)} />
    </>);
};

export const DesktopSidebar = ({
    className,
    children,
    ...props
}) => {
    const { open, setOpen, animate } = useSidebar();
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const dispatch = useDispatch();
    return (<>
        <motion.div
            className={cn(
                "h-full px-4 py-4 hidden  md:flex md:flex-col bg-zinc-100 dark:bg-dark1 dark:border-r-2 dark:border-secondary w-[256px] flex-shrink-0",
                className
            )}
            animate={{
                width: animate ? (open ? "256px" : "60px") : "256px",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            {...props}>
            {children}
        </motion.div>
    </>);
};

export const MobileSidebar = ({
    className,
    children,
    ...props
}) => {
    const { open, setOpen } = useSidebar();
    return (<>
        <div
            className={cn(
                "h-16 px-8 flex md:hidden items-center justify-between bg-zinc-100 dark:bg-dark1 w-full fixed z-50 dark:border-b-2 dark:border-secondary"
            )}
            {...props}>
            <div className="text-lg font-bold  flex items-center">
                <Image src={NusaIcon} alt="NusaGo Logo" width={24} height={24} />
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-primary-gradient font-podkova ml-2">
                    NusaGo
                </span>
            </div>
            <div className="flex justify-end z-20 w-full">
                <IconMenu2
                    className="text-primary dark:text-secondary "
                    onClick={() => setOpen(!open)} />
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                        className={cn(
                            "fixed h-full w-full inset-0 blurSidebar3 dark:bg-dark1/90 p-10 z-[100] flex flex-col justify-between",
                            className
                        )}>
                        <div
                            className="absolute right-10 top-10 z-50 text-primary "
                            onClick={() => setOpen(!open)}>
                            <IconX className="cursor-pointer dark:text-secondary" />
                        </div>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>);
};

export const SidebarLink = ({
    link,
    className,
    ...props
}) => {
    const { open, animate } = useSidebar();
    return (
        (<Link
            href={link.href}
            className={cn(open ? "justify-start" : "justify-center", "flex items-center gap-2 group/sidebar py-2 dark:text-secondary", className)}
            {...props}>
            {link.icon}
            <motion.span
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-primary font-bold text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 dark:text-secondary">
                {link.label}
            </motion.span>
        </Link>)
    );
};

export const SidebarLogout = ({
    onClick,
    className,
    ...props
}) => {
    const { open, animate } = useSidebar();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({ name: "", profilePictureUrl: "" });
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
            });
        }
    }, []);

    const label = isLoggedIn ? "Logout" : "Login";
    const icon = isLoggedIn ? <IconLogout className="text-primary h-5 w-5 flex-shrink-0 dark:text-secondary" /> : <IconLogin className="text-primary h-5 w-5 flex-shrink-0 dark:text-secondary" />;

    if (isLoggedIn) {
        return (
            <button
                className={cn(open ? "justify-start" : "justify-center", "flex items-center gap-2 group/sidebar py-2", className)}
                onClick={onClick}
                {...props}>
                {icon}
                <motion.span
                    animate={{
                        display: animate ? (open ? "inline-block" : "none") : "inline-block",
                        opacity: animate ? (open ? 1 : 0) : 1,
                    }}
                    className="text-primary font-bold text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 dark:text-secondary">
                    {label}
                </motion.span>
            </button>
        );
    } else {
        return (
            <Link
                href="/login"
                className={cn(open ? "justify-start" : "justify-center", "flex items-center gap-2 group/sidebar py-2", className)}
                {...props}>
                {icon}
                <motion.span
                    animate={{
                        display: animate ? (open ? "inline-block" : "none") : "inline-block",
                        opacity: animate ? (open ? 1 : 0) : 1,
                    }}
                    className="text-primary font-bold text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 dark:text-secondary">
                    {label}
                </motion.span>
            </Link>
        );
    }
};

export const SidebarProfile = ({
    onClick,
    className,
    ...props
}) => {
    const { open, animate } = useSidebar();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({ name: "", profilePictureUrl: "" });
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
            });
        }
    }, []);

    const label = isLoggedIn ? `${profile.name}` : "Login Now";
    const icon = isLoggedIn ? <Image
        src={profile.profilePictureUrl}
        className="h-7 w-7 flex-shrink-0 rounded-full"
        width={50}
        height={50}
        alt="Avatar"
    /> : <IconUserCircle className="text-primary h-5 w-5 flex-shrink-0 dark:text-secondary" />;

    if (isLoggedIn) {
        return (
            <Link
                href="/profile"
                className={cn(open ? "justify-start" : "justify-center", "flex items-center gap-2 group/sidebar py-2", className)}
                {...props}>
                {icon}
                <motion.span
                    animate={{
                        display: animate ? (open ? "inline-block" : "none") : "inline-block",
                        opacity: animate ? (open ? 1 : 0) : 1,
                    }}
                    className="text-primary font-bold text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 dark:text-secondary">
                    {label}
                </motion.span>
            </Link>
        );
    } else {
        return (
            <Link
                href="/login"
                className={cn(open ? "justify-start" : "justify-center", "flex items-center gap-2 group/sidebar py-2", className)}
                {...props}>
                {icon}
                <motion.span
                    animate={{
                        display: animate ? (open ? "inline-block" : "none") : "inline-block",
                        opacity: animate ? (open ? 1 : 0) : 1,
                    }}
                    className="text-primary font-bold text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 dark:text-secondary">
                    {label}
                </motion.span>
            </Link>
        );
    }
};