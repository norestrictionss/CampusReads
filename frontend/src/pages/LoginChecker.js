
import { Context } from "../contexts/AuthContext";
import { useContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"

// That method aims to check the status of the user. Accordingly with, user is redirected again.
export default function LoginChecker({children, toBooks}){

    const navigate = useNavigate();
    const { user } = useContext(Context);

    useEffect(()=>{
        if(user){
            console.log('hi');
            navigate("/books");
        }
    }, []);

    if(!user)
            return children;
    
}