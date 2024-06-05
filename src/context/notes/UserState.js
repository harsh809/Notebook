import Usercontext from "./usercontext";
import { useState } from "react";

function UserState(props) {
    const host = "https://notebook-server-kappa.vercel.app"
    // const host = "http://localhost:5000"

    // Get user details
    const getuser = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setuser(json);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    const [user, setuser] = useState(null);

    return (
        <Usercontext.Provider value={{ getuser, user }}>
            {props.children}
        </Usercontext.Provider>
    )
}

export default UserState
