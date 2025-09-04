
"use client";

import { auth, db } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  type UserCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

type AppUser = {
    uid: string;
    email: string | null;
    fullName: string;
    phoneNumber: string;
};

export const signUp = async (email: string, password: string, fullName: string, phoneNumber: string): Promise<AppUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // This is the data structure for the new user document in Firestore.
    const appUser: AppUser = {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        phoneNumber: phoneNumber,
    };

    // Save additional user info in Firestore.
    // This creates the document that was previously missing.
    await setDoc(doc(db, "users", user.uid), {
      ...appUser,
      createdAt: serverTimestamp(),
    });
    
    return appUser;
  } catch (error: any) {
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
            phoneNumber: userData.phoneNumber || ""
        };
    } else {
        // This case might happen for users created before the fix.
        // We can create their document now to prevent future errors.
        console.warn(`User document for ${user.uid} not found. Creating one.`);
        const newUser: AppUser = {
          uid: user.uid,
          email: user.email,
          fullName: 'User', // Default name
          phoneNumber: '',
        };
        await setDoc(doc(db, "users", user.uid), {
          ...newUser,
          createdAt: serverTimestamp(),
        });
        return newUser;
    }

  } catch (error: any) {
    console.error("Sign in error:", error);
    throw new Error(error.message || "Failed to sign in.");
  }
};

export const updateUserProfile = async (uid: string, data: { fullName?: string; phoneNumber?: string }): Promise<AppUser> => {
    try {
        const userDocRef = doc(db, "users", uid);
        
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
            throw new Error("User document does not exist. Cannot update.");
        }

        await updateDoc(userDocRef, data);
        const updatedDoc = await getDoc(userDocRef);
        const userData = updatedDoc.data();

        if (!userData) {
            throw new Error("Could not find updated user data.");
        }

        return {
            uid: uid,
            email: userData.email,
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
        };
    } catch (error: any) {
        console.error("Update profile error:", error);
        throw new Error(error.message || "Failed to update profile.");
    }
};

