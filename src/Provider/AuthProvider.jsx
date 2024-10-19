import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, deleteUser } from "firebase/auth"; // Import deleteUser function
import app from "../Firebase/firebase.config";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false));
    };

    const updateUserProfile = (name, photo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name, photoURL: photo
            });
        } else {
            return Promise.reject(new Error("No user is currently signed in."));
        }
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
            .finally(() => setLoading(false));
    };

    const deleteUserAccount = (email) => {
        setLoading(true);
        return deleteUser(auth.currentUser)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleLogin,
        deleteUser: deleteUserAccount
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
