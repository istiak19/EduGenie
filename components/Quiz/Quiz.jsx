"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Programming";
  const topic = searchParams.get("topic") || "Python";

  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/quiz/questions?category=${category}&topic=${topic}`);
        const data = await res.json();
        setQuestions(data);
        setQuizLoaded(true);
      } catch (err) {
        toast.error("Failed to load quiz questions");
      }
    };
    fetchQuestions();
  }, [category, topic]);

  const handleOptionSelect = (questionId, option) => {
    setUserAnswers({ ...userAnswers, [questionId]: option });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const answers = questions.map(q => ({
        questionId: q._id,
        userAnswer: userAnswers[q._id] || "",
      }));

      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, category, topic, answers }),
      });

      const data = await res.json();
      if (res.ok) {
        setScore(data.score);
        setSubmitted(true);
        toast.success(`Quiz Submitted! Your score is ${data.score}/${questions.length}`);
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to submit quiz!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
      {!quizLoaded ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loading />
        </div>
      ) : questions.length === 0 ? (
        <p className="text-center text-red-500 text-lg font-semibold">
          No quiz available for this category/topic.
        </p>
      ) : (
        <>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-teal-600 dark:text-teal-400">
            Quiz: {category} ({topic})
          </h2>

          {questions.map((q, i) => (
            <div
              key={q._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-5 sm:p-7 mb-8 transition hover:shadow-lg"
            >
              <p className="text-lg sm:text-xl font-semibold mb-5">
                {i + 1}. {q.question}
              </p>

              <div className="space-y-4">
                {q.options.map((option, index) => {
                  const isSelected = userAnswers[q._id] === option;
                  const isCorrect = q.correctAnswer === option;
                  const userSelectedWrong = isSelected && !isCorrect;

                  let optionStyle = "bg-gray-50 dark:bg-gray-800 border hover:bg-gray-100 dark:hover:bg-gray-700";
                  if (submitted && showAnswers) {
                    if (isCorrect) optionStyle = "bg-green-100 dark:bg-green-800 border border-green-400";
                    else if (userSelectedWrong) optionStyle = "bg-red-100 dark:bg-red-800 border border-red-400";
                  } else if (isSelected) {
                    optionStyle = "bg-blue-100 dark:bg-blue-800 border border-blue-400";
                  }

                  return (
                    <label
                      key={index}
                      className={`flex items-start gap-3 px-4 py-3 rounded-md cursor-pointer transition-all text-sm sm:text-base ${optionStyle}`}
                    >
                      <input
                        type="radio"
                        name={`question-${q._id}`}
                        value={option}
                        checked={userAnswers[q._id] === option}
                        onChange={() => handleOptionSelect(q._id, option)}
                        disabled={submitted}
                        className="mt-1"
                      />
                      <span className="break-words">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted && questions.length > 0 && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-2 mt-3 text-lg rounded-lg transition duration-300 
             ${loading
                  ? "bg-green-400 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                }
           `}
            >
              {loading ? "Submitting..." : "Submit Quiz"}
            </button>
          )}

          {submitted && (
            <div className="text-center mt-10 space-y-6">
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                Your Score: {score} / {questions.length}
              </h3>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {!showAnswers && (
                  <button
                    onClick={() => setShowAnswers(true)}
                    className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Show Correct Answers
                  </button>
                )}
                <button
                  onClick={() => router.push("/")}
                  className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  Go to Home
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default Quiz;