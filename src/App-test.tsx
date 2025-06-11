import React from 'react'
import TestComponent from "./components/TestComponent"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          AR PMB - Test Mode
        </h1>
        <TestComponent />
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            System Status Check
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              React: Working
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              TypeScript: Working
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              Tailwind CSS: Working
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
