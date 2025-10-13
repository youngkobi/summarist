import Image from "next/image";
import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Numbers from "@/components/Numbers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>

      <Landing/>
      <Features/>
      <Reviews/>
      <Numbers/>
      <Footer/>
    </div>
  );
}
