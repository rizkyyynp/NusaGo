import Image from 'next/image';
import RegisterIllustration from '../assets/images/regist-logo.png';
import NusaIcon from '../assets/images/nusago.png';
import Link from 'next/link';
import RegisterForm from '../components/Register/registerForm';

export default function Register() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full md:w-1/2 p-4 flex items-center justify-center md:p-0">
                <Image src={RegisterIllustration} alt="Sign up illustration" className="w-1/2 h-auto md:w-full" />
            </div>
            <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center">
                        <Image src={NusaIcon} alt="NusaGo Logo" className="w-10 h-10" />
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-primary-gradient">NusaGo | Register</h1>
                    </div>
                </div>
                <RegisterForm />
                <p className="text-center mt-4 text-gray-600">Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Login</Link></p>
            </div>
        </div>
    );
}
