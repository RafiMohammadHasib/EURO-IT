
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export const addUser = async (user: UserProfile): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'users'), user);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Could not add user to database.");
  }
};

export const getUserByEmail = async (email: string): Promise<UserProfile | null> => {
    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return { id: userDoc.id, ...userDoc.data() } as UserProfile;
        }
        return null;
    } catch (e) {
        console.error("Error fetching user: ", e);
        throw new Error("Could not fetch user from database.");
    }
}
