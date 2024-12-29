import React from 'react'

const SignUp = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center '>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-gray-700 text-center mb-6">Sign up</h1>
      <form action="#" method="POST">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-600 mb-1">Confirm password</label>
          <input 
            type="confirmPassword" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Enter your password again" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      <p class="text-sm text-gray-600 text-center mt-4">
        Already have an account? 
        <a href="/login" class="text-blue-500 hover:underline">Log in</a>
      </p>
    </div>
  </div>
  )
}

export default SignUp