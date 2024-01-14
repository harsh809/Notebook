import Usercontext from "./usercontext";
import { useState } from "react";


function UserState(props) {
    const host = "http://localhost:5000"
    // get user details
    const getuser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setuser(json);
    }
    const [user, setuser] = useState(null);
    return (
        <Usercontext.Provider value={{getuser,user}}>
            {props.children}
        </Usercontext.Provider>
    )
}

export default UserState
