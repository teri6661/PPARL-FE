"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("token");
    if (!token) {
      router.replace("/dashboard");
      return;
    }
    let user = null;
    if (userCookie) {
      try {
        user = JSON.parse(userCookie);
      } catch (e) {
        Object.keys(Cookies.get()).forEach((cookieName) => {
          Cookies.remove(cookieName);
        });
      }
    }

    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (!decoded.exp || decoded.exp <= now) {
        router.replace("/login");
      } else {
        user.role[0].role.role_name === "Admin"
          ? router.replace("/perusahaan")
          : router.replace("/beranda");
      }
    } catch (e) {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
