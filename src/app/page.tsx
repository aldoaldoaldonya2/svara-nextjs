'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/AuthServices';
import { Toaster, toast } from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (mode === 'login') {
        await authService.login(email, password);
        router.push('/dashboard');
      } else {
        if (password !== confirmPassword) {
          toast.error('Password dan konfirmasi tidak sama');
          return;
        }

        await authService.register({
          name,
          email,
          password,
        });

        toast.success('Registrasi berhasil, silakan login');
        setMode('login');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex font-poppins">
      <Toaster position="top-right" />
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0a192f] via-[#0f2744] to-[#1a365d] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+')]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <div className="mb-8">
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-800">Svara</h1>
          </div>

          <div className="bg-white my-8 rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                {mode === 'login' ? 'Selamat Datang' : 'Buat Akun Baru'}
              </h2>
              <p className="text-gray-600 mt-2">
                {mode === 'login'
                  ? 'Masukkan kredensial Anda untuk melanjutkan'
                  : 'Lengkapi data untuk mendaftar'}
              </p>
            </div>

            <div className="space-y-6">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="Nama lengkap"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                    placeholder="anda@contoh.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="Ulangi password"
                  />
                </div>
              )}
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Ingat saya
                  </label>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Lupa password?
                </button>
              </div> */}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#0a192f] to-[#1a365d] text-white rounded-xl"
              >
                {loading
                  ? 'Memproses...'
                  : mode === 'login'
                  ? 'Masuk'
                  : 'Daftar'}
              </button>
              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-6">
              <p className="text-center text-sm text-gray-600">
                {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
                >
                  {mode === 'login' ? 'Daftar sekarang' : 'Masuk'}
                </button>
              </p>
              <p className="text-center text-xs text-gray-500 mt-4">
                © 2025 Svara.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}