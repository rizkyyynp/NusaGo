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
                    <div className="w-full md:w-3/4">
                        <Image
                            src={LoginIcon}
                            alt="Login Illustration"
                            layout="responsive"
                            width={500}
                            height={500}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center">
                            <Image
                                src={NusaIcon}
                                alt="NusaGo Logo"
                                width={40}
                                height={40}
                            />
                            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-primary-gradient font-podkova">NusaGo | <span className='text-2xl font-extrabold text-transparent bg-clip-text bg-primary-gradient font-podkova'>Login</span></h1>
                        </div>
                    </div>

                    <LoginForm />

                    <div className="text-center mt-4">
                        <p className="text-sm text-zinc-600 font-nunito">Don't have an account? <Link href="/register" className="text-primary hover:underline font-bold font-nunito">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}



