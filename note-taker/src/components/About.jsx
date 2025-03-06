import React from 'react';
import { FaStickyNote, FaLightbulb, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          About NoteTaker
        </h1>
        <p className="text-lg text-gray-600">
          Your go-to platform for organizing thoughts, ideas, and tasks.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <div className="flex justify-center">
            <FaStickyNote className="text-5xl text-blue-500 mb-6" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Simple & Intuitive
          </h2>
          <p className="text-gray-600">
            NoteTaker is designed to be easy to use, so you can focus on what matters most—your ideas.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <div className="flex justify-center">
            <FaLightbulb className="text-5xl text-yellow-500 mb-6" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Boost Your Productivity
          </h2>
          <p className="text-gray-600">
            Organize your notes, set reminders, and never miss a deadline again.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <div className="flex justify-center">
            <FaUsers className="text-5xl text-green-500 mb-6" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Built for Everyone
          </h2>
          <p className="text-gray-600">
            Whether you're a student, professional, or creative, NoteTaker adapts to your needs.
          </p>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-600">
        <p>© 2023 NoteTaker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;