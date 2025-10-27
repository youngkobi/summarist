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
  Menu,
  X,
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
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const router = useRouter();

  // 🔄 Check login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // 🧩 Menu items
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
    { icon: <Pencil size={18} />, label: "Highlights", noCursor: true },
    { icon: <Search size={18} />, label: "Search", noCursor: true },
  ];

  const dynamicBottomMenu = [
    {
      icon: <Settings size={18} />,
      label: "Settings",
      onClick: () => router.push("/settings"),
    },
    { icon: <HelpCircle size={18} />, label: "Help & Support", noCursor: true },
    isLoggedIn
      ? {
          icon: <LogOut size={18} />,
          label: "Logout",
          onClick: () => {
            if (confirm("Are you sure you want to log out?")) {
              signOut(auth);
              setActiveItem("For you");
            }
          },
        }
      : {
          icon: <Import size={18} />,
          label: "Login",
          onClick: () => openModal(),
        },
  ];

  return (
    <>
      {/* 🔹 Hamburger Button (Mobile Only) */}
      <button
        className="sidebar__burger-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 🔹 Sidebar Drawer */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div>
          <Image className="side__img" src={logo} alt="logo" />
          <nav className="sidebar-nav">
            {topMenu.map(({ icon, label, onClick, noCursor }, i) =>
              onClick ? (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(label);
                    onClick();
                    setIsOpen(false); // close menu on selection
                  }}
                  className={`sidebar-item ${
                    activeItem === label ? "active" : ""
                  } ${noCursor ? "no-cursor" : ""}`}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ) : (
                <div
                  key={i}
                  className={`sidebar-item disabled ${
                    noCursor ? "no-cursor" : ""
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </div>
              )
            )}
          </nav>
        </div>

        <div className="sidebar-bottom">
          {dynamicBottomMenu.map(({ icon, label, onClick, noCursor }, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveItem(label);
                if (onClick) onClick();
                setIsOpen(false); // close after click
              }}
              className={`sidebar-item ${
                activeItem === label ? "active" : ""
              } ${noCursor ? "no-cursor" : ""}`}
            >
              {icon}
              <span>{label}</span>
            </a>
          ))}
        </div>
      </aside>

      {/* Optional: Overlay behind sidebar when open */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
