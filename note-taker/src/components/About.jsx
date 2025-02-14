import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-65px)] bg-gray-100 p-6">
      <div className="max-w-2xl bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About NoteTaker</h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to <strong className="text-blue-500">NoteTaker</strong>, your personal space for organizing and storing your thoughts, ideas, and notes. 
          Our mission is to provide a simple, secure, and intuitive platform for you to manage your notes effortlessly.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          With NoteTaker, you can create topics, add notes, and access them anytime, anywhere. Whether you're a student, 
          professional, or just someone who loves jotting down ideas, NoteTaker is designed to make your life easier.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Our platform is built with privacy in mind. Your notes are securely stored and accessible only to you. 
          Simply log in to your account, and all your notes will be right at your fingertips.
        </p>
        <p className="text-lg text-gray-600">
          Thank you for choosing NoteTaker. Start organizing your thoughts today and make note-taking a breeze!
        </p>
      </div>
    </div>
  );
};

export default About;