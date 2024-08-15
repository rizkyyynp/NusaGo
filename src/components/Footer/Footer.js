import Image from "next/image";
import Link from "next/link";
import NusaIcon from "../../assets/images/nusago.png";
import React from 'react';
import { useSelector } from 'react-redux';

export default function Footer() {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    return (
        <footer className={`${darkMode ? 'bg-dark1' : "bg-zinc-100"} pl-16 pr-2 lg:px-20 py-4 shadow-BS4`}>
            <div className="mx-auto w-full">
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <Image src={NusaIcon} alt="NusaGo logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-primary-gradient font-podkova">NusaGo</span>
                    </div>
                    <nav className="flex space-x-6 text-lg font-nunito">
                        <Link href="/" className={`${darkMode ? 'text-secondary after:bg-secondary' : 'text-primary after:bg-primary'} relative inline-block font-semibold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2  after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}>Home</Link>
                        <Link href="/activity" className={`${darkMode ? 'text-secondary after:bg-secondary' : 'text-primary after:bg-primary'} relative inline-block font-semibold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2  after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}>Activity</Link>
                        <Link href="/promo" className={`${darkMode ? 'text-secondary after:bg-secondary' : 'text-primary after:bg-primary'} relative inline-block font-semibold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2  after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}>Promo</Link>
                    </nav>
                    <div className="flex space-x-4">
                        <Link href="#" className={`${darkMode ? 'bg-secondary' : 'bg-primary'} text-zinc-100 hover:scale-105 transition-all duration-300  w-8 h-8 rounded-lg items-center justify-center flex`} rel="ugc" aria-label="instagram">
                            <i className="fab fa-instagram text-xl"></i>
                        </Link>
                        <Link href="#" className={`${darkMode ? 'bg-secondary' : 'bg-primary'} text-zinc-100 hover:scale-105 transition-all duration-300  w-8 h-8 rounded-lg items-center justify-center flex`} rel="ugc" aria-label="linkedin">
                            <i className="fab fa-linkedin text-lg"></i>
                        </Link>
                        <Link href="#" className={`${darkMode ? 'bg-secondary' : 'bg-primary'} text-zinc-100 hover:scale-105 transition-all duration-300  w-8 h-8 rounded-lg items-center justify-center flex`} rel="ugc" aria-label="facebook">
                        <i className="fab fa-facebook text-lg"></i>
                        </Link>
                    </div>
                </div>
                <hr className={`${darkMode ? 'border-secondary' : 'border-blue-600'} my-4 }`} />
                <p className={`${darkMode ? 'text-secondary' : 'text-blue-600'} text-center text-sm  font-nunito`}>Copyright © 2024 NusaGo Templates | All Rights Reserved</p>
            </div>
        </footer>
    );
}