import { createContext,useState,useEffect } from "react";
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth'


export const Context = createContext();

export function AuthContext({children}){

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true)


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setLoading(false);
            if(currentUser){
                setUser(currentUser);
            }
            else{
                setUser(null);
            }
        });

    }, []);

    const values = {
        user: user,
        setUser: setUser
     }

     console.log("User:", user);
    return (<Context.Provider value = {values}>
        {!loading && children }
    </Context.Provider>);
};