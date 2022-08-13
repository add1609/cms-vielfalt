import React, {useContext, useEffect, useState} from "react";
import {auth, db} from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
} from "firebase/auth";

import {get, push, ref, remove, set} from "firebase/database";

const AuthContext = React.createContext(undefined);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [loading, setLoading] = useState(false);

    async function signup(email, fullName, password) {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {
            displayName: fullName,
        });

        const data = {
            uid: user.uid,
            email: user.email,
            fullName: fullName,
        };

        setLoading(true);
        const path = "users/" + user.uid;
        const dbref = ref(db, path);
        await set(dbref, data);
        setLoading(false);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    async function uploadTodb(obj, pathname) {
        if (currentUser) {
            setLoading(true);
            const path = "users/" + currentUser.uid + "/" + pathname;
            const dbref = ref(db, path);
            const newPostRef = push(dbref);
            await set(newPostRef, obj);
            setLoading(false);
        }
    }

    async function updateTodb(obj, dataKey, pathname) {
        if (currentUser) {
            setLoading(true);
            const path = "users/" + currentUser.uid + "/" + pathname + "/" + dataKey;
            const dbref = ref(db, path);
            await set(dbref, obj);
            setLoading(false);
        }
    }

    async function deleteData(dataKey, pathname) {
        if (currentUser) {
            setLoading(true);
            const path = "users/" + currentUser.uid + "/" + pathname + "/" + dataKey;
            const dbref = ref(db, path);
            const snapshot = await get(dbref);
            if (snapshot.exists()) {
                await remove(dbref);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        uploadTodb,
        updateTodb,
        deleteData,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
