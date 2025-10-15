"use client";
import { Home, BookMarked, Pencil, Search, Settings, HelpCircle, LogOut } from "lucide-react";

export default function Sidebar() {
  const topMenu = [
    { icon: <Home size={18} />, label: "For you" },
    { icon: <BookMarked size={18} />, label: "My Library" },
    { icon: <Pencil size={18} />, label: "Highlights" },
    { icon: <Search size={18} />, label: "Search" },
  ];

  const bottomMenu = [
    { icon: <Settings size={18} />, label: "Settings" },
    { icon: <HelpCircle size={18} />, label: "Help & Support" },
    { icon: <LogOut size={18} />, label: "Logout" },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">Menu</div>
        <nav className="sidebar-nav">
          {topMenu.map((item, i) => (
            <a key={i} href="#" className="sidebar-item">
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        {bottomMenu.map((item, i) => (
          <a key={i} href="#" className="sidebar-item">
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
