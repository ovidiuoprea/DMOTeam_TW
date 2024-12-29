import React from 'react'

const Button = ({text}) => {
  return (
    <button className="px-6 py-3 bg-blue-800 text-white font-semibold text-lg rounded-lg shadow-md transform transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 focus:outline-none">
      {text}
    </button>
  )
}

export default Button