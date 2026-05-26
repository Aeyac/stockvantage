import { useState, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    // Parallax background effect from the original design
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const blobs = document.querySelectorAll('.bg-blob');
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 20;
                blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0D0E11] text-[#F8FAFC] font-['Public Sans',_sans-serif] overflow-hidden relative selection:bg-[#10B981]/30">
            {/* Load Google Fonts & Icons dynamically if not already globally available */}
            <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <style>{`
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
                .glass-card { background: rgba(22, 23, 27, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .input-glow:focus-within { box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); border-color: #10B981; }
            `}</style>

            {/* Atmospheric Background Elements */}
            <div className="bg-blob absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#10B981]/10 blur-[120px] rounded-full pointer-events-none transition-transform duration-75 ease-out"></div>
            <div className="bg-blob absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#10B981]/5 blur-[120px] rounded-full pointer-events-none transition-transform duration-75 ease-out"></div>

            <main className="w-full max-w-[440px] relative z-10">
                <Head title="Login | StockVantage" />

                {/* Logo and Branding Section */}
                <div className="flex flex-col items-center mb-10 space-y-4">
                    <div className="w-16 h-16 relative group cursor-pointer">
                        <div className="absolute inset-0 bg-[#10B981]/20 blur-xl group-hover:bg-[#10B981]/40 transition-all duration-500 rounded-full"></div>
                        <img alt="StockVantage Logo" className="w-full h-full relative object-contain" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfUkAAADYElEQVR4AeycTY7TQBCFqyy2xLkCK5DgEmzIiAMgkLgAwwVgM3FmwY4df3sWIE6QZMMhYAG3IMMSSNNPlkf2xBoGv07abpflHrd/quv11+V0q2RNJrZRBAwghU/EABpAkgBpbhFoAEkCpPneInCyLh5Pl4uv01XxxdfvS6LbXgDmq8WTzOl7UbktonfU6StxxV58SeQteKcAT0Xe1PulzvlL9Svp1IMCnKyKY0+qAQ+otirPRYst6qmVYAAReZno64uAnMjx2az4ePF6KudZiI4AXlvkAd5mNn8bwkdf26ABDhBe0LGgAI4dHkaiM8DJevGo7bXdinua+msLcFXpBvBzcS3bysuqkeqI3zw/YezMwtX9FI/dAIKEul84nBcnP/3COcmlynkfWyrdAN4tfm9VnzXaU7muTt5hLdi4nvhJN4Aeytm9+Qe8sr7a2DO/FsTk0riY8EnG9A2TRRtETC5jgUgBBPyxQ6QBjh1iEIAVRKwBUa8XvM5+YnlYv5ZSPRhAQMEasP03UV9YPhCEWkq+LB7ky8W36WrhUBBxHmLjSZ8PvJGv5Q/u96VAc+61N4R2OAkQgXqqKjfrvj1Ecc4JQFZF/Sq7/sz/1cM/XWrWU7ZlGmApZFeGaolM/S1V/PWVnu1eVmPgu8ijAXZxmpKNASRH0wDGBujniu+khmjmIbQHiEB3EkLIoSmWmt0J65cGuDkqPm2O5rd+zOY6pALN0B4dICtg6PZ0BA4dAKvfAJIEDaABJAmQ5vuLQFLYUMwNIDlSNEDk1PJaPrAv+b5/6YDmvK/5QHJQD2JeprJ6nA88CAXSSQmRa4R+hTn3w7c2gOQYGsDYAMu0EKkiknkI7QEi0PKB1Pgjp4bc2pBygdAKzdBOdd4bB4hA38qIdwNIDn4DINnWKM0NIDnsBtAAkgRIc4vA2ACRU8sj5APhMw+QzyP5hfi3J7rzfSAr6ir2ZSpK6e/7ruLrsmfoV7jsyGUu9ncvpu+qVzTAqqGxHg0gOfIGMDbAEDm1rn2I6bvSHCAF4+QDS3j8930ViK5HGiByasitIcd2yAKf8N2146HsaIChhAy1HQNIjpwBNIAkAdLcItAAkgRIc4tAA0gSIM0tAg0gSYA0twgcIUCyy2HNLQJJngbQAJIESPO/AAAA//8h7hSUAAAABklEQVQDAB0Amb/vTHtiAAAAAElFTkSuQmCC" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">StockVantage</h1>
                        <p className="text-[#94A3B8] text-sm font-medium tracking-wide uppercase">SaaS Inventory Management</p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="glass-card rounded-xl p-8 shadow-2xl border border-[#23252B]">
                    <div className="mb-8">
                        <h2 class="text-3xl font-bold text-[#F8FAFC] mb-2">Welcome Back</h2>
                        <p className="text-[#94A3B8] text-sm">Please enter your details to sign in.</p>
                    </div>

                    {status && (
                        <div className="mb-6 text-sm font-medium text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <InputLabel className="block text-sm font-semibold text-[#94A3B8] ml-1" htmlFor="email" value="Email Address" />
                            <div className="relative group input-glow rounded-lg transition-all border border-[#23252B] bg-[#16171B]">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#10B981] transition-colors">mail</span>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="name@company.com"
                                    className="w-full bg-transparent border-none text-[#F8FAFC] pl-12 pr-4 py-3.5 focus:ring-0 outline-none text-sm placeholder:text-[#94A3B8]/40"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1 ml-1 text-xs text-red-400" />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <InputLabel className="block text-sm font-semibold text-[#94A3B8]" htmlFor="password" value="Password" />
                            </div>
                            <div className="relative group input-glow rounded-lg transition-all border border-[#23252B] bg-[#16171B]">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#10B981] transition-colors">lock</span>
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    placeholder="••••••••••••"
                                    className="w-full bg-transparent border-none text-[#F8FAFC] pl-12 pr-12 py-3.5 focus:ring-0 outline-none text-sm placeholder:text-[#94A3B8]/40"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1 ml-1 text-xs text-red-400" />
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer group select-none">
                                <div className="relative flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-[#23252B] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
                                </div>
                                <span className="ml-3 text-sm font-medium text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors">Remember Me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-semibold text-[#10B981] hover:text-[#10B981]/80 transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            )}
                        </div>

                        {/* Login Button */}
                        <PrimaryButton
                            className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white font-bold py-4 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 group border-none normal-case h-auto tracking-normal"
                            disabled={processing}
                        >
                            <span>Login</span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </PrimaryButton>
                    </form>

                    {/* SSO Options */}
                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-6">
                            <div className="flex-grow border-t border-[#23252B]"></div>
                            <span className="flex-shrink mx-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-widest">Or continue with</span>
                            <div className="flex-grow border-t border-[#23252B]"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 bg-[#0D0E11] border border-[#23252B] hover:bg-[#16171B] py-3 rounded-lg transition-all text-[#F8FAFC]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                                <span className="text-sm font-semibold">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 bg-[#0D0E11] border border-[#23252B] hover:bg-[#16171B] py-3 rounded-lg transition-all text-[#F8FAFC]">
                                <svg className="w-5 h-5 fill-[#F8FAFC]" viewBox="0 0 24 24">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                                </svg>
                                <span className="text-sm font-semibold">GitHub</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Options */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-[#94A3B8] text-sm">
                        Don't have an account?
                        <Link href={route('register')} className="text-[#10B981] font-bold hover:underline ml-1">Sign up</Link>
                    </p>
                    <div className="flex items-center justify-center gap-6 text-[11px] font-bold text-[#94A3B8]/40 uppercase tracking-[0.2em]">
                        <a className="hover:text-[#94A3B8] transition-colors" href="#">Terms of Service</a>
                        <span>•</span>
                        <a className="hover:text-[#94A3B8] transition-colors" href="#">Privacy Policy</a>
                        <span>•</span>
                        <a className="hover:text-[#94A3B8] transition-colors" href="#">System Status</a>
                    </div>
                </div>
            </main>
        </div>
    );
}