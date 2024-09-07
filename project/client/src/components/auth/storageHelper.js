import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../firebase";

export async function getDownloadURLFromStorage(email) {
    try {
        const storageRef = ref(storage, `resumes/${email}.pdf`);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        throw error;
    }
}

export async function uploadResume(email, resume) {
    try {
        const storageRef = ref(storage, `resumes/${email}.pdf`);
        const uploadTask = uploadBytesResumable(storageRef, resume, {
            contentType: "application/pdf",
        });

        const downloadURL = await new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });

        return downloadURL;
    } catch (error) {
        throw error;
    }
}
