import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authenticate } = useAuth();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const body = { email, password };
        const response = await authenticate('login', body);

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            router.push('/');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: response.response.data.message || 'Invalid email or password',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary font-hind">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Input Your Email"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-primary placeholder-text-primary font-nunito"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary font-hind">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Input Your Password"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-primary placeholder-text-primary font-nunito"
                    required
                />
            </div>
            <div>
                <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-zinc-100 py-2 px-4 rounded-md transition-all duration-500 ease-in-out transform hover:scale-105 font-sans">
                    Login
                </button>
            </div>
        </form>
    )
}
