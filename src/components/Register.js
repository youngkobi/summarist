

'use client';
import { useState } from "react";
import { auth } from "../../firebase";
import {createUserWithEmailAndPassword } from "firebase/auth";
import Modal from "./Modal";

export default function Register({ onOpenModal })  {
    return (
        <>

    </>
  );
}









//   function register() {
//     console.log("works");
//     createUserWithEmailAndPassword(auth, "email@email.com", "password")
//   .then((user) => {
//     // Signed up 
//   console.log(user);
  
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage);
    
//   });
//   }