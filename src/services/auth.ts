
"use client";

import { auth, db } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  type UserCredential
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUp = async (email: string, password: string, fullName: string): Promise<UserCredential['user']> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      createdAt: new Date(),
    });
    
    return user;
  } catch (error: any) {
    // Handle specific Firebase errors if needed
    console.error("Sign up error:", error);
    throw new Error(error.message || "Failed to sign up.");
  }
};

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    console.error("Sign in error:", error);
    throw new Error(error.message || "Failed to sign in.");
  }
};
