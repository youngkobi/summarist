import Api from "@/components/api";
import Modal from "@/components/Modal";
import NavbarForYou from "@/components/NavbarForYou";
import RecommendedForYou from "@/components/RecsForyou";
import Sidebar from "@/components/sidebar";
import SuggestedBooks from "@/components/SuggestedBooks";
import React from "react";

const page = () => {
  return (
    <div className="layout__foryou">
      <Sidebar />
      <Modal/>
      <div className="main-content__foryou">
       <NavbarForYou/>
        <div className="page-foryou">
          <div className="gray-bar-container">
            <div className="gray-bar"></div>
            </div>
        <Api/>
        <RecommendedForYou/>
        <SuggestedBooks/>
        </div>
      </div>
    </div>
  );
};

export default page;
