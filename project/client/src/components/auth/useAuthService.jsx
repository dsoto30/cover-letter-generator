import { useDispatch } from "react-redux";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase";
import { setUser, setLoading, logout, setError } from "../../redux/authSlice";

export const useAuthService = () => {
    const dispatch = useDispatch();

    const registerUser = async ({ email, password, resume, displayName }) => {
        try {
            dispatch(setLoading(true));
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName });

            const user = auth.currentUser;
            dispatch(
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
            );

            const storageRef = ref(storage, `resumes/${user.uid}`);
            const upload = uploadBytesResumable(storageRef, resume, {
                contentType: "application/pdf",
            });

            await new Promise((resolve, reject) => {
                upload.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        console.error(error.code);
                        reject(new Error(error.code));
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(
                                upload.snapshot.ref
                            );
                            await setDoc(doc(db, "resumes", user.uid), {
                                uid: user.uid,
                                email: user.email,
                                displayName: user.displayName,
                                resume: downloadURL,
                                updatedAt: new Date(),
                            });
                            resolve();
                        } catch (error) {
                            reject(new Error(error.message));
                        }
                    }
                );
            });

            dispatch(setError(null));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            throw error;
        }
    };

    const loginUser = async ({ email, password }) => {
        try {
            dispatch(setLoading(true));
            await signInWithEmailAndPassword(auth, email, password);
            dispatch(setError(null));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            throw error;
        }
    };

    const logoutUser = async () => {
        try {
            dispatch(setLoading(true));
            await signOut(auth);
            dispatch(logout());
            dispatch(setError(null));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            throw error;
        }
    };

    return {
        registerUser,
        loginUser,
        logoutUser,
    };
};
