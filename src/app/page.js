import Image from "next/image";
import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Numbers from "@/components/Numbers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";


export default function Home({onOpenModal}) {
  return (
    <div>
      <Navbar/>
      <Modal/>
      <Landing onOpenModal={onOpenModal}/>
      <Features/>
      <Reviews onOpenModal={onOpenModal}/>
      <Numbers/>
      <Footer/>
    </div>
  );
}
