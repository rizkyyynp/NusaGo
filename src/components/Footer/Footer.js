import Image from "next/image";
import Link from "next/link";
import NusaIcon from "../../assets/images/nusago.png";

export default function Footer() {
    return (
        <footer className="bg-white pl-16 pr-2 lg:pl-0 lg:pr-0 py-2 border-t">
            <div className="mx-auto w-full px-5">
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <Image src={NusaIcon} alt="NusaGo logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-primary-gradient">NusaGo</span>
                    </div>
                    <nav className="flex space-x-6 text-lg">
                        <Link href="/" className="relative inline-block text-primary font-semibold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Home</Link>
                        <Link href="/activity" className="relative inline-block text-primary font-semibold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Activity</Link>
                        <Link href="/promo" className="relative inline-block text-primary font-semibold text-lg transition-all duration-300  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Promo</Link>
                    </nav>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-zinc-100 hover:scale-105 transition-all duration-300 bg-primary w-8 h-8 rounded-lg items-center justify-center flex" rel="ugc">
                            <i className="fa-brands fa-instagram text-xl"></i>
                        </Link>
                        <Link href="#" className="text-zinc-100 hover:scale-105 transition-all duration-300 bg-primary w-8 h-8 rounded-lg items-center justify-center flex" rel="ugc">
                            <i className="fa-brands fa-linkedin text-lg"></i>
                        </Link>
                        <Link href="#" className="text-zinc-100 hover:scale-105 transition-all duration-300 bg-primary w-8 h-8 rounded-lg items-center justify-center flex" rel="ugc">
                            <i className="fa-brands fa-facebook text-lg"></i>
                        </Link>
                    </div>
                </div>
                <hr className="my-4 border-blue-600" />
                <p className="text-center text-sm text-blue-600">Copyright © 2024 NusaGo Templates | All Rights Reserved</p>
            </div>
        </footer>
    );
}