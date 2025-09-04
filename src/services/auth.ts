
"use client";

import { auth, db, storage } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  type UserCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type AppUser = {
    uid: string;
    email: string | null;
    fullName: string;
    phoneNumber: string;
    photoURL?: string;
};

export const signUp = async (email: string, password: string, fullName: string, phoneNumber: string): Promise<AppUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const appUser: AppUser = {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        phoneNumber: phoneNumber,
        photoURL: user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
    };

    // Save additional user info in Firestore.
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

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
            uid: user.uid,
            email: user.email,
            fullName: userData.fullName || "User",
            phoneNumber: userData.phoneNumber || "",
            photoURL: userData.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
        };
    } else {
        console.warn(`User document for ${user.uid} not found. Creating one.`);
        const newUser: AppUser = {
          uid: user.uid,
          email: user.email,
          fullName: 'New User',
          phoneNumber: '',
          photoURL: `https://picsum.photos/seed/${user.uid}/100/100`,
        };
        await setDoc(doc(db, "users", user.uid), {
          ...newUser,
          createdAt: serverTimestamp(),
        });
        return newUser;
    }

  } catch (error: any)
{
    console.error("Sign in error:", error);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        throw new Error("Invalid email or password. Please try again.");
    }
    throw new Error(error.message || "Failed to sign in.");
  }
};

export const updateUserProfile = async (uid: string, data: { fullName?: string; phoneNumber?: string }): Promise<AppUser> => {
    try {
        const userDocRef = doc(db, "users", uid);
        
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
            console.warn(`User document for ${uid} not found on update. Creating it now.`);
            const user = auth.currentUser;
            if (!user) throw new Error("Authentication error: No user is currently signed in.");

            const newUser: Omit<AppUser, 'uid' | 'email'> & { createdAt: any } = {
                fullName: data.fullName || "User",
                phoneNumber: data.phoneNumber || "",
                photoURL: `https://picsum.photos/seed/${user.uid}/100/100`,
                createdAt: serverTimestamp()
            };
            await setDoc(userDocRef, { ...newUser, ...data });
        } else {
            await updateDoc(userDocRef, data);
        }

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
            photoURL: userData.photoURL,
        };
    } catch (error: any) {
        console.error("Update profile error:", error);
        throw new Error(error.message || "Failed to update profile.");
    }
};

export const updateUserProfilePicture = async (uid: string, file: File): Promise<string> => {
    try {
        const storageRef = ref(storage, `profile-pictures/${uid}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
            photoURL: downloadURL
        });
        
        return downloadURL;
    } catch (error: any) {
        console.error("Profile picture upload error:", error);
        throw new Error(error.message || "Failed to upload profile picture.");
    }
};
