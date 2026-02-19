import Cookies from "js-cookie";

export const logout = () => {
    console.log("Logout initiated: Clearing tokens.");
    
    // টোকেন রিমুভ করা
    Cookies.remove("access");
    Cookies.remove("refresh");

    // ইউজারকে লগইন পেজে পাঠানো
    window.location.href = "/login"; 
};