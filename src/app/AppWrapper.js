"use client";

import Modal from '@/components/Modal';
import Navbar from '@/components/Navbar';
import { useState } from 'react';



export default function AppWrapper({ children }) {
      const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  return (
    <>
    <Navbar onOpenModal={handleOpenModal} />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
      
        {children}
      </>
  );
}
