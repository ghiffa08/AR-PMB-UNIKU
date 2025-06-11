// Test component to verify React and Tailwind CSS are working
import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Test Component</h1>
      <p className="mt-2">If you can see this styled properly, Tailwind CSS is working!</p>
    </div>
  );
};

export default TestComponent;
