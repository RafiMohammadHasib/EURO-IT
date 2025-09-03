
"use client";

import { auth, db } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  type UserCredential
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

type AppUser = {
    uid: string;
    email: string | null;
    fullName: string;
};

export const signUp = async (email: string, password: string, fullName: string): Promise<AppUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const appUser: AppUser = {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
    };

    // Save additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...appUser,
      createdAt: new Date(),
    });
    
    return appUser;
  } catch (error: any) {
    // Handle specific Firebase errors if needed
    console.error("Sign up error:", error);
    throw new Error(error.message || "Failed to sign up.");
  }
};

export const signIn = async (email: string, password: string): Promise<AppUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user profile from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
            uid: user.uid,
            email: user.email,
            fullName: userData.fullName || "User",
        };
    } else {
        // This case should ideally not happen if users are always created via your signUp function
        return {
            uid: user.uid,
            email: user.email,
            fullName: "User",
        };
    }

  } catch (error: any) {
    console.error("Sign in error:", error);
    throw new Error(error.message || "Failed to sign in.");
  }
};

    