'use client';

import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

export class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL!;

  async login(email: string, password: string) {
    const res = await axiosInstance.post('/login', { email, password });
    const json = res.data;

    if (!json.token) {
      throw new Error(json.message || 'Login gagal');
    }

    Cookies.set('access_token', json.token, {
      expires: 1,
      sameSite: 'lax',
    });

    Cookies.set('user', JSON.stringify(json.user), {
      expires: 1,
    });

    return json.user;
  }

    async logout() {
    try {
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      Cookies.remove('access_token');
      Cookies.remove('user');

      window.location.href = './';
    }
  }
}

export const authService = new AuthService();
