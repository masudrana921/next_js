"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import api from '@/services/api/axiosClient';
import { logout } from '@/services/api/auth';
import { useRouter } from 'next/navigation';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');

        // যদি টোকেন না থাকে, সরাসরি লগইন পেজে পাঠানো
        if (!accessToken) {
            logout();
            return;
        }

        // টোকেন ভেরিফাই করার ফাংশন
        const verifyToken = async () => {
            try {
                // /token/verify তে রিকোয়েস্ট। Header এ Access Token ইন্টারসেপ্টর দ্বারা যুক্ত হচ্ছে।
                await api.post('/token/verify/', { token: accessToken }); 
                // টোকেন ভ্যালিড! 
                setIsLoading(false); 

            } catch (error) {
                // টোকেন ভেরিফিকেশন ফেইল করলে (মেয়াদোত্তীর্ণ)
                console.log("Token verification failed. Attempting refresh...");
                
                // রিফ্রেশ করার চেষ্টা
                try {
                    await api.post('/token/refresh/', { refresh: refreshToken });
                    // রিফ্রেশ সফল হলে, Interceptor নতুন টোকেন সেভ করেছে।
                    setIsLoading(false); 
                    
                } catch (refreshError) {
                    // রিফ্রেশও ফেইল! লগআউট করে দেওয়া
                    console.error("Refresh failed. Logging out.");
                    logout();
                }
            }
        };

        verifyToken();
        
    }, [router]);


    // লোড হওয়া পর্যন্ত স্পিনার/মেসেজ দেখানো
    if (isLoading) {
        return <div className="h-screen flex items-center justify-center">
            <p className="text-xl">Checking Auth Status...</p>
        </div>;
    }

    // অথেন্টিকেশন সফল হলে চিলড্রেন রেন্ডার করা
    return children;
};

export default AuthChecker;