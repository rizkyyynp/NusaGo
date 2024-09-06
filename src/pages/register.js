import Head from 'next/head';
import Image from 'next/image';
import RegisterIllustration from '../assets/regist-logo.png';
import NusaIcon from '../assets/nusago.png';
import Link from 'next/link';
import RegisterForm from '../components/Register/registerForm';

export default function Register() {
    return (
        <>
        <Head>
                <title>NusaGo | Sign Up</title>
                <meta name="description" content="Create an account on NusaGo to access exclusive features and services." />
            </Head>
            <div className="flex flex-col md:flex-row items-center justify-center  min-h-screen lg:h-screen bg-gray-100 p-4 lg:p-6">
                <div className="w-full h-full md:flex items-center justify-center md:w-1/2 hidden">
                    <Image
                        src={RegisterIllustration}
                        alt="Register Ilustration"
                        width={500}
                        height={500}
                        priority
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-2/5 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center">
                <div className="flex items-center justify-center mb-6">
                        <Image
                            src={NusaIcon}
                            width={40}
                            height={40}
                            alt="Nusa Icon"
                        />
                        <h1 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-primary-gradient font-podkova ">NusaGo | Register</h1>
                    </div>
                    <RegisterForm />
                    <p className="text-center mt-4 text-gray-600 font-nunito">Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline font-nunito">Login</Link></p>
                </div>
            </div>
        </>

    );
}
