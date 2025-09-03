
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { GenerateMarketPlanOutput } from '@/ai/flows/market-plan-flow';

export const saveMarketPlan = async (userId: string, plan: GenerateMarketPlanOutput): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'marketPlans'), {
      ...plan,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Could not save marketing plan.");
  }
};

    