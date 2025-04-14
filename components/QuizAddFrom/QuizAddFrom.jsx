'use client';
import { useState } from 'react';

const QuizAddFrom = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    category: 'web-development',
  });

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Quiz added successfully!');
      setFormData({ question: '', options: ['', '', '', ''], correctAnswer: '', category: 'web-development' });
    } else {
      alert('Error: ' + data.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Enter question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        {formData.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        ))}

        <select
          value={formData.correctAnswer}
          onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Correct Answer</option>
          {formData.options.map((option, index) => (
            <option key={index} value={option}>{option || `Option ${index + 1}`}</option>
          ))}
        </select>

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full border p-2 rounded"
          required
        >
          <option value="web-development">Web Development</option>
          <option value="graphics-design">Graphics Design</option>
          <option value="digital-marketing">Digital Marketing</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizAddFrom;
