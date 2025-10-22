'use client';

import { FaBookOpen, FaMicrophone } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useModal } from '@/components/ModalContext';
import { useRouter } from 'next/navigation';

export default function ReadListenButtons({ bookId, subscriptionRequired }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { openModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);

      if (user) {
        // ✅ Pull subscription status from Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsSubscribed(!!userData.isSubscribed); // will be true or false
        } else {
          setIsSubscribed(false); // fallback
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) {
      openModal(); // 🔓 Show login modal
      return;
    }

    if (subscriptionRequired && !isSubscribed) {
      router.push('/choose-plan'); // 🔒 Send to plan page
    } else {
      router.push(`/player/${bookId}`); // 🎧 Free or subscribed user
    }
  };

  return (
    <div className="bookdetails-page__actions">
      <button className="bookdetails-page__btn bookdetails-page__btn--primary" onClick={handleClick}>
        <FaBookOpen size={18} /> Read
      </button>
      <button className="bookdetails-page__btn bookdetails-page__btn--primary" onClick={handleClick}>
        <FaMicrophone size={18} /> Listen
      </button>
    </div>
  );
}
