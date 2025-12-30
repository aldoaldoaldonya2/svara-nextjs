'use client';

import { authService } from "@/services/AuthServices";

export default function Dashboard(){
    return <>
        <div>
            <p className="text-white">Hello World</p>
        </div>
        <button
        onClick={() => authService.logout()}
        className="text-red-600"
        >
            Logout
        </button>
    </>
}