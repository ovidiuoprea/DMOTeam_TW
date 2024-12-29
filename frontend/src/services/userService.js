const API_URL =  process.env.REACT_APP_API_URL + "/user-api";

export const login = async (email, password) => { 
    
    const url = API_URL + "/login"

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        const data = await response.json();
        return {success: true, data}
    }
    catch (error) { 
        console.error("Login error: ", error.message);
        return {success: false, error: error.message}
    }
}

/**
 * @returns: boolean => true -> logged in, false -> not logged in
 */
export const getUserAuthStatus = () => { 
    const authData = JSON.parse(localStorage.getItem("authData"));

    const currentTime = new Date();
    if(!authData) {
        return false;
    }
    if(currentTime.toISOString() > authData.expiresAt) { 
        return false;
    }
    else {
        return true;
    }
}

/**
 * 
 * @returns authenticated user if logged in || null if not logged in
 */
export const getCurrentAuthenticatedUser = () => { 
    const loggedIn = getUserAuthStatus();
    if(loggedIn) { 
        const authData = JSON.parse(localStorage.getItem("authData"));
        return authData.user;
    }
    else {
        return null;
    }
}