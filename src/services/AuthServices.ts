'use client';

import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

export class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL!;

  async login(email: string, password: string) {
    const res = await axiosInstance.post(`/login`, { email, password });
    const json = res.data;

    if (!json.meta?.status) {
      throw new Error(json.meta?.message || "Login gagal");
    }

    Cookies.set("access_token", json.data.access_token, {
      expires: 1,
      sameSite: 'lax',
    });

    Cookies.set("user", JSON.stringify({
      full_name: json.data.user.full_name,
      role: json.data.role,
      company_id: json.data.user.company_id,
    }), { expires: 1 });

    return json.data.user;
  }
}

export const authService = new AuthService();
