import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC6hberMM6AAG0GqtjwKLwbo2auRBUbsvg",
    authDomain: "scheduler-ca828.firebaseapp.com",
    databaseURL: "https://scheduler-ca828-default-rtdb.firebaseio.com",
    projectId: "scheduler-ca828",
    storageBucket: "scheduler-ca828.appspot.com",
    messagingSenderId: "738798148932",
    appId: "1:738798148932:web:5581b815f2c73b8f4ccb11",
    measurementId: "G-63EVGBLB1T"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

  const setData = (path, value) => set(ref(database, path), value);
  const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };
const firebaseSignOut = () => signOut(getAuth(firebase));

const useUserState = () => {
    const [user, setUser] = useState();
  
    useEffect(() => {
      onIdTokenChanged(getAuth(firebase), setUser);
    }, []);
  
    return [user];
  };

export { setData, signInWithGoogle, firebaseSignOut as signOut, useUserState };


