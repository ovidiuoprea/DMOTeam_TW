import React, { useState } from 'react'
import { login, getCurrentAuthenticatedUser, updateLocalStorage } from '../services/userService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatusMessage, setLoginStatusMessage]=useState("");

    const EXPIRY_TIME_HOURS = 3;

    let logged_in_user = null;

    const onFormSubmit = async (event) => { 
        event.preventDefault();
        
        if(email && password) {
            const response = await login(email, password);
            
            if(response.data){
                logged_in_user = response.data.user;
                setLoginStatusMessage("Login successful!")
            }
            else {
                setLoginStatusMessage("User/password combo failed!");
            }
        }

        if(logged_in_user) {
            updateLocalStorage(logged_in_user, 3);
        }

        setTimeout(()=>{
            const user = getCurrentAuthenticatedUser();
            if(user){
                console.log("authenticated user: ");
                console.log(user);
            }
        }, 2000)
    }

  return (
  <div className='h-screen w-screen flex items-center justify-center '>
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Log in</h1>
      <form onSubmit={onFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email" 
            defaultValue={email}
            onChange={(event)=>{setEmail(event.target.value)}}
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            defaultValue={password} 
            onChange ={(event)=>{setPassword(event.target.value)}}
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-600 text-center mt-4">
        Don't have an account?
        <a href="/signup" className="text-blue-500 hover:underline" style={{marginLeft: 2 + "px"}}>Sign up</a>
      </p>
      <p 
        style={{marginTop: 24 + 'px'}}
        className={`text-md text-center login__fail-message ${loginStatusMessage !== "Login successful!" ? "text-red-700" : "text-green-700"}`} >
        {loginStatusMessage !== "" ? `${loginStatusMessage}` : ""}
      </p>
    </div>
  </div>
  )
}

export default Login