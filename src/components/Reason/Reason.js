import Image from "next/image";
import ReasonImage1 from "@/assets/images/travelingBro.png";
import ReasonImage2 from "@/assets/images/travelerPana.png";
import ReasonImage3 from "@/assets/images/roadTrip.png";
import React from 'react';
import { useSelector } from 'react-redux';

export default function Reason() {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    return (
        <div className="grid gap-8 lg:grid-cols-3 pl-16 pr-2 lg:px-0">
            <div className={`${darkMode ?'border-secondary' : "border-primary"} text-center hover:border-2  transition-all duration-300 ease-in-out hover:scale-105 px-6 lg:px-0 rounded-tr-20px rounded-bl-20px`}>
                <Image src={ReasonImage1} alt="Authentic Local Experiences" className="mx-auto mb-4 w-37.5 h-37.5" />
                <h3 className={`${darkMode ?'text-secondary' : "text-primary"} text-xl font-semibold mb-2 font-hind`}>Authentic Local Experiences</h3>
                <p className={`${darkMode ?'text-secondary' : "text-zinc-800"} font-nunito`}>Immerse yourself in genuine Indonesian culture with our curated local experiences.</p>
            </div>
            <div className={`${darkMode ? 'border-secondary' : "border-primary"} text-center hover:border-2  transition-all duration-300 ease-in-out hover:scale-105 px-6 lg:px-0 rounded-20px`}>
                <Image src={ReasonImage2} alt="Personalized Itineraries" className="mx-auto mb-4 w-37.5 h-37.5" />
                <h3 className={`${darkMode ?'text-secondary' : "text-primary"} text-xl font-semibold mb-2 font-hind`}>Personalized Itineraries</h3>
                <p className={`${darkMode ?'text-secondary' : "text-zinc-800"} font-nunito`}>Tailor your journey with customized itineraries to suit your interests & preferences.</p>
            </div>
            <div className={`${darkMode ?'border-secondary' : "border-primary"} text-center hover:border-2  transition-all duration-300 ease-in-out hover:scale-105 px-6 lg:px-0 rounded-tl-20px rounded-br-20px`}>
                <Image src={ReasonImage3} alt="Dedicated Support" className="mx-auto mb-4 w-37.5 h-37.5" />
                <h3 className={`${darkMode ?'text-secondary' : "text-primary"} text-xl font-semibold mb-2 font-hind`}>Dedicated Support</h3>
                <p className={`${darkMode ?'text-secondary' : "text-zinc-800"} font-nunito`}>Enjoy peace of mind with our 24/7 customer support and expert travel guidance.</p>
            </div>
        </div>
    )
}