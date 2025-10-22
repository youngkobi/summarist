"use client";

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useModal } from '@/components/ModalContext';
import { FaBookmark } from 'react-icons/fa';
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc
} from 'firebase/firestore';
import { auth, db } from '../../firebase';

export default function SaveToLibraryButton({ book }) {
  const [user, setUser] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // ✅ Track if saved
  const { openModal } = useModal();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        // ✅ Check if the book is already saved
        const bookRef = doc(db, 'users', user.uid, 'library', book.id);
        const docSnap = await getDoc(bookRef);
        setIsSaved(docSnap.exists());
      }
    });

    return () => unsubscribe();
  }, [book.id]);

  const handleToggleSave = async () => {
    if (!user) {
      openModal();
      return;
    }

    const bookRef = doc(db, 'users', user.uid, 'library', book.id);

    try {
      if (isSaved) {
        // ❌ Remove from library
        await deleteDoc(bookRef);
        setIsSaved(false);
      } else {
        // ✅ Add to library
        await setDoc(bookRef, {
          title: book.title,
          author: book.author,
          image: book.image,
          subtitle: book.subtitle,
          duration: book.duration,
          id: book.id,
          subscriptionRequired: book.subscriptionRequired,
          addedAt: new Date().toISOString()
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to toggle book:', error);
    }
  };

  return (
    <button
      className={`bookdetails-page__add-library-btn ${isSaved ? 'saved' : ''}`}
      onClick={handleToggleSave}
    >
      <FaBookmark size={18} />
      {isSaved ? 'Saved in My Library' : 'Add to My Library'}
    </button>
  );
}
