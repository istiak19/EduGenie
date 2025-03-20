'use client';

import React, { useState } from 'react';

const StudentDashboard = () => {
  const [registeredWebinars, setRegisteredWebinars] = useState([]);

  const badges = [
    { name: 'Completed Web Dev Course', icon: '🖥️' },
    { name: '100% Quiz Score', icon: '🏆' },
    { name: 'Active Participant', icon: '🎯' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Imtiaz', score: 950 },
    { rank: 2, name: 'Janealam', score: 900 },
    { rank: 3, name: 'Showrv', score: 850 },
    { rank: 4, name: 'Istiak', score: 800 },
  ];

  const upcomingWebinars = [
    { title: 'Advanced JavaScript', date: 'March 20, 2025', time: '10:00 AM' },
    { title: 'React Basics', date: 'March 25, 2025', time: '1:00 PM' },
    { title: 'Node.js for Beginners', date: 'March 28, 2025', time: '3:00 PM' },
  ];

  const handleRegister = (webinarTitle) => {
    setRegisteredWebinars((prev) => [...prev, webinarTitle]);
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-8 min-h-screen">
      <div className="mb-8">
        <h2 className="mb-6 font-bold text-teal-700 text-3xl">Student Achievements</h2>
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {badges.map((badge, index) => (
            <div key={index} className="bg-gradient-to-r from-teal-200 to-teal-300 shadow-xl p-6 rounded-lg text-center hover:scale-105 transition-transform transform">
              <div className="text-5xl">{badge.icon}</div>
              <p className="mt-4 font-semibold text-teal-900">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-6 font-bold text-teal-700 text-3xl">Progress Leaderboard</h2>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-100">
                <th className="px-6 py-4 text-teal-800">Rank</th>
                <th className="px-6 py-4 text-teal-800">Name</th>
                <th className="px-6 py-4 text-teal-800">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className="hover:bg-teal-50 border-b">
                  <td className="px-6 py-4 text-gray-800">{entry.rank}</td>
                  <td className="px-6 py-4 text-gray-700">{entry.name}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-6 font-bold text-teal-700 text-3xl">Upcoming Webinars/Live Sessions</h2>
        <div className="space-y-6">
          {upcomingWebinars.map((webinar, index) => (
            <div key={index} className="flex justify-between items-center bg-white shadow-xl p-6 rounded-lg hover:scale-105 transition-transform transform">
              <div>
                <h3 className="font-semibold text-gray-800 text-xl">{webinar.title}</h3>
                <p className="text-gray-600">{webinar.date} - {webinar.time}</p>
              </div>
              <button
                onClick={() => handleRegister(webinar.title)}
                disabled={registeredWebinars.includes(webinar.title)}
                className={`bg-teal-600 ${registeredWebinars.includes(webinar.title) ? 'bg-teal-400 cursor-not-allowed' : 'hover:bg-teal-700'} shadow-md px-8 py-3 rounded-lg font-medium text-white hover:scale-105 transition-transform transform`}
              >
                {registeredWebinars.includes(webinar.title) ? 'Registered' : 'Register Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
