import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchResume = async (uid) => {
    try {
        const userDocRef = doc(db, "resumes", uid);
        const userDoc = await getDoc(userDocRef);
        return userDoc.data();
    } catch (error) {
        throw new Error(error.message);
    }
};
