'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'web-development';
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(`/api/quiz/questions?category=${category}`);
      const data = await res.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, [category]);

  const handleOptionSelect = (questionId, option) => {
    setUserAnswers({ ...userAnswers, [questionId]: option });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const answers = questions.map(q => ({
        questionId: q._id,
        userAnswer: userAnswers[q._id] || ''
      }));

      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, category, answers })
      });

      const data = await res.json();
      if (res.ok) {
        setScore(data.score);
        setSubmitted(true);
        toast.success(`🎉 Quiz Submitted! Your score is ${data.score}/${questions.length}`);
      } else {
        toast.error(data.error || '❌ Something went wrong!');
      }
    } catch (error) {
      toast.error('❌ Failed to submit quiz!');
    } finally {
      setLoading(false);
    }
  };

  if (!questions.length) return <p className="text-center mt-10">Loading questions...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz - {category}</h2>

      {questions.map((q, i) => (
        <div key={q._id} className="mb-6">
          <p className="font-medium mb-2">{i + 1}. {q.question}</p>
          {q.options.map((option, index) => (
            <label key={index} className="block cursor-pointer">
              <input
                type="radio"
                name={`question-${q._id}`}
                value={option}
                checked={userAnswers[q._id] === option}
                onChange={() => handleOptionSelect(q._id, option)}
                disabled={submitted}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${loading && 'opacity-50 cursor-not-allowed'}`}
        >
          {loading ? 'Submitting...' : 'Submit Quiz'}
        </button>
      ) : (
        <div className="text-center mt-6">
          <h3 className="text-xl font-semibold">Your Score: {score} / {questions.length}</h3>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Quiz;