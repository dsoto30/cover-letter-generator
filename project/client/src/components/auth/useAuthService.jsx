import { useDispatch } from "react-redux";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase";
import { setUser, setLoading, logout } from "../../redux/authSlice";

export const useAuthService = () => {
    const dispatch = useDispatch();

    const registerUser = async ({ email, password, resume, displayName }) => {
        try {
            dispatch(setLoading(true));
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName });

            const storageRef = ref(storage, `resumes/${user.uid}`);
            const upload = uploadBytesResumable(storageRef, resume, {
                contentType: "application/pdf",
            });

            const user = auth.currentUser;

            await new Promise((resolve, reject) => {
                upload.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                    },
                    (error) => {
                        reject(new Error(error.code));
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(
                                upload.snapshot.ref
                            );
                            await setDoc(doc(db, "resumes", user.uid), {
                                uid: user.uid,
                                resume: downloadURL,
                                updatedAt: new Date(),
                                role: "user",
                            });
                            resolve();
                        } catch (error) {
                            reject(new Error(error.message));
                        }
                    }
                );
            });

            dispatch(setUser({ uid: user.uid, displayName, email }));

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

            const user = auth.currentUser;

            dispatch(
                setUser({ uid: user.uid, displayName: user.displayName, email })
            );
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            throw error;
        }
    };

    const handleReauth = async (originalPassword) => {
        try {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                originalPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
        } catch (error) {
            throw error;
        }
    };

    const updateUserProfile = async ({
        displayName,
        password,
        resume,
        originalPassword,
    }) => {
        try {
            dispatch(setLoading(true));

            await handleReauth(originalPassword);

            if (displayName && displayName !== auth.currentUser.displayName) {
                await updateProfile(auth.currentUser, { displayName });
            }

            if (password && password !== auth.currentUser.password) {
                await updatePassword(auth.currentUser, password);
            }

            if (resume) {
                const storageRef = ref(storage, `resumes/${user.uid}`);
                const userDocRef = doc(db, "resumes", auth.currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                const resumeUrl = userDoc.data()?.resume;

                if (resumeUrl) {
                    const resumeRef = ref(storage, resumeUrl);
                    await deleteObject(resumeRef);
                }

                const upload = uploadBytesResumable(storageRef, resume, {
                    contentType: "application/pdf",
                });
                await new Promise((resolve, reject) => {
                    upload.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                        },
                        (error) => {
                            reject(new Error(error.code));
                        },
                        async () => {
                            try {
                                const downloadURL = await getDownloadURL(
                                    upload.snapshot.ref
                                );
                                await updateDoc(userDocRef, {
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
            }
            const user = auth.currentUser;
            dispatch(
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
            );
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
        updateUserProfile,
    };
};
