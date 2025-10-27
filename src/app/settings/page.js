"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import Sidebar from "@/components/sidebar";
import Modal from "@/components/Modal";
import NavbarForYou from "@/components/NavbarForYou";
import { useRouter } from "next/navigation"; // ✅ not next/router


export default function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("Loading...");

 const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);

      if (user) {
        setUserEmail(user.email);

        // ✅ Pull subscription status from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          // You can store `plan` or `isSubscribed` in Firestore
          if (userData.isSubscribed) {
            setSubscriptionPlan("Premium");
          } else {
            setSubscriptionPlan("Basic");
          }
        } else {
          // No user doc yet — fallback
          setSubscriptionPlan("Basic");
        }
      } else {
        setSubscriptionPlan("Not Logged In");
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleUpgrade = async () => {
      router.push("/choose-plan");
  };

  return (
      <div className="layout__foryou">
      <Sidebar />
      <Modal/>
       <div className="main-content__foryou">
      <NavbarForYou/>
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <section className="settings-section">
        <h2 className="section-label">Your Subscription plan</h2>
        <p className="plan-name">{subscriptionPlan}</p>
        {subscriptionPlan !== "Premium" && (
          <button className="upgrade-btn" onClick={handleUpgrade}>
            Upgrade to Premium
          </button>
        )}
      </section>

      {isLoggedIn && (
        <section className="settings-section">
          <h2 className="section-label">Email</h2>
          <p className="user-email">{userEmail}</p>
        </section>
      )}
    </div>
    </div>
    </div>
  );
}
