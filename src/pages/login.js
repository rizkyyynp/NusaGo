import Image from 'next/image';
import NusaIcon from '../assets/images/nusago.png';
import LoginIcon from '../assets/images/login-logo.png';
import Link from 'next/link';
import LoginForm from '@/components/Login/loginForm';


export default function Login() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-zinc-100 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
                <div className="md:w-1/2 p-6 flex items-center justify-center">
                    <Image src={LoginIcon} alt="Login Illustration" className="w-1/2 md:w-3/4 h-auto lg:w-full" />
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center">
                            <Image src={NusaIcon} alt="NusaGo Logo" className="w-10 h-10" />
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-primary-gradient">NusaGo | <span className='text-2xl font-bold text-transparent bg-clip-text bg-primary-gradient'>Login</span></h1>
                        </div>
                    </div>

                    <LoginForm />

                    <div className="text-center mt-4">
                        <p className="text-sm text-zinc-600">Don't have an account? <Link href="/register" className="text-primary hover:underline font-bold">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}



