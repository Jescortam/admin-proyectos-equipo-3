import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user != null) {
        const userRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.data().isAdmin) {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      }

      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if (pending) {
    return (<>Loading...</>)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser, isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};