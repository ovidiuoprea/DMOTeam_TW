const API_URL =  process.env.REACT_APP_API_URL + "/user-api";

export const login = async (email, password) => { 
    
    const url = API_URL + "/login"

    //TODO: @Ovidiu FIX cors overriding RESTful error messages.
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

export const logout = () => { 
    updateLocalStorage(null, -1);
}

export const signUp = async (name, email, password, role) => { 
    const user = JSON.stringify({name, email, password, role});

    const url = API_URL + "/user";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: user
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        const data = await response.json();
        return {success: true, data}
    }
    catch (error) { 
        return {success: false, error: error.message}
    }
}

/**
 * Updates local storage info for selected user.
 * @param {*} user 
 * @param {*} EXPIRY_TIME_HOURS How long should the authentication be valid for
 */
export const updateLocalStorage = (user, EXPIRY_TIME_HOURS) => {
    let currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setHours(currentDate.getHours() + EXPIRY_TIME_HOURS);

    const authData = {
        user: user,
        expiresAt: expiryDate.toISOString()
    }
    localStorage.setItem("authData", JSON.stringify(authData));
}

/**
 * Gets all users with reviewer role
 * 
 * @returns all reviewers
 */
export const getReviewers=async ()=>{
    try {
        const response = await fetch(API_URL + "/userreviewer");


        if (!response.ok) {
            throw new Error("Ceva a mers prost cu fetch-ul");
        }

        const result = await response.json();
        return result;
        } catch (error) {
        console.error(error.message); 
        } 
}


export const getArticlesForReviewer = async (reviewer_id) => {
    try{
        const url = API_URL + "/article-by-reviewer-id/" + reviewer_id;
        
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Fetch articles for reviewer_id failed!");
        }
        
        const result = await response.json();
        
        return Array.from(result);
    }
    catch (error) {
        console.error(error.message);
    }
}

export const getUserById= async(user_id)=>{
    try {
        const response=await fetch(API_URL+`/user/${user_id}`)
        if(!response.ok){
            throw new Error("Problema la fetch");
        }
        const result =await response.json();
        return result;
    
    } catch (error) {
        console.error(error.message);
    }
}
