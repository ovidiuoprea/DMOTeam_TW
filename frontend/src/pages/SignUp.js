import React, { useState } from 'react'
import { getCurrentAuthenticatedUser, signUp, updateLocalStorage } from '../services/userService';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Organizer');

    const onSignupFormSubmit = async (event) => { 
        event.preventDefault();

        if(name !== '' && email !== '' && password !== '' && role !== '') {
            const response = await signUp(name, email, password, role);

            if(response.data){
                updateLocalStorage(response.data, 3);

                setTimeout(()=>{
                    window.location.href="/"
                }, 1000)
            }

            
        }
    }

  return (
    <div className='h-screen w-screen flex items-center justify-center '>
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Sign up</h1>
      <form onSubmit={onSignupFormSubmit}>
      <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Nume</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Introduceti numele" 
            defaultValue={name}
            onChange={(event) => {setName(event.target.value)}}
            required
             
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Introduceti email-ul" 
            defaultValue={email}
            onChange={(event) => {setEmail(event.target.value)}}
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Parola</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            defaultValue={password}
            onChange={(event) => {setPassword(event.target.value)}}
            placeholder="Introduceti parola" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">Confirmati parola</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Introduceti parola din nou" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-1">Rol</label>
          <select className="w-full text-sm font-medium text-gray-600 mb-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="role"
            defaultValue={role}
            onChange={(event) => {setRole(event.target.value)}}
            name="role"
            required>
                <option className="block text-sm font-medium text-gray-600 mb-1">Organizer</option>
                <option className="block text-sm font-medium text-gray-600 mb-1">Reviewer</option>
                <option className="block text-sm font-medium text-gray-600 mb-1">Author</option>
          </select>
          {/* <input 
            type="text" 
            id="role" 
            name="role" 
            placeholder="Enter your password" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          /> */}
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-600 text-center mt-4">
        Already have an account? 
        <a href="/login" className="text-blue-500 hover:underline">Log in</a>
      </p>
    </div>
  </div>
  )
}

export default SignUp