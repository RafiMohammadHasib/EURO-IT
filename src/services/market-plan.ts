
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import type { GenerateMarketPlanOutput } from '@/ai/flows/market-plan-flow';

export type MarketPlan = GenerateMarketPlanOutput & {
    id: string;
    createdAt: Date;
};


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

export const getMarketPlans = async (userId: string): Promise<MarketPlan[]> => {
    try {
        const plansRef = collection(db, 'users', userId, 'marketPlans');
        const q = query(plansRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const plans: MarketPlan[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            plans.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
            } as MarketPlan);
        });
        return plans;
    } catch (e) {
        console.error("Error fetching market plans: ", e);
        throw new Error("Could not fetch market plans.");
    }
}
    
