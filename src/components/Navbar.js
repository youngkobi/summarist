"use client"


import logo from "@/assets/logo.png";
import Image from "next/image";
import { useModal } from "./ModalContext";


function Navbar() {
  const { openModal } = useModal();
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li onClick={openModal} className="pointer">Login</li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
