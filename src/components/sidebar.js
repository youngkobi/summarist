"use client";

import {
  Home,
  BookMarked,
  Pencil,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  Import,
} from "lucide-react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { useModal } from "./ModalContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("For you");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { openModal } = useModal();
  const router = useRouter();

  // 🔄 Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  // 🧩 Top menu items
  const topMenu = [
    {
      icon: <Home size={18} />,
      label: "For you",
      onClick: () => router.push("/foryou"),
    },
    {
      icon: <BookMarked size={18} />,
      label: "My Library",
      onClick: () => router.push("/mylibrary"),
    },
    { icon: <Pencil size={18} />, label: "Highlights" },
    { icon: <Search size={18} />, label: "Search" },
  ];

  // ⚙️ Bottom menu with dynamic login/logout
  const dynamicBottomMenu = [
    { icon: <Settings size={18} />, label: "Settings" },
    { icon: <HelpCircle size={18} />, label: "Help & Support" },
    isLoggedIn
      ? {
          icon: <LogOut size={18} />,
          label: "Logout",
          onClick: () => {
            if (confirm("Are you sure you want to log out?")) {
              signOut(auth);
              setActiveItem("For you"); // optional reset
            }
          },
        }
      : {
          icon: <Import size={18} />,
          label: "Login",
          onClick: () => {
            openModal(); // Open modal when not logged in
          },
        },
  ];

  return (
    <aside className="sidebar">
      <div>
        <Image className="side__img" src={logo} alt="logo" />
        <nav className="sidebar-nav">
          {topMenu.map(({ icon, label, onClick }, i) =>
            onClick ? (
              <a
                key={i}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(label);
                  onClick();
                }}
                className={`sidebar-item ${
                  activeItem === label ? "active" : ""
                }`}
              >
                {icon}
                <span>{label}</span>
              </a>
            ) : (
              <div
                key={i}
                className="sidebar-item disabled" // you can add styles for disabled look
              >
                {icon}
                <span>{label}</span>
              </div>
            )
          )}
        </nav>
      </div>

      <div className="sidebar-bottom">
        {dynamicBottomMenu.map((item, i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveItem(item.label);
              if (item.onClick) item.onClick();
            }}
            className={`sidebar-item ${
              activeItem === item.label ? "active" : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
