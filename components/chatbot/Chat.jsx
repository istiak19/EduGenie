import Chatbot from "./Chatbot";

const Chat = () => {
  return (
    <div className="bg-gray-900 py-20 shadow-2xl mx-auto   w-full text-center relative overflow-hidden">
      {/* Floating Animation Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-gray-900 opacity-50"
      />
      <div
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-500 opacity-30 rounded-full blur-3xl"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-indigo-500 opacity-30 rounded-full blur-3xl"
      />

      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-4 z-10 relative">
        How can we help you today?
      </h2>
      <p className="text-md text-gray-400 mb-6 z-10 relative">
        Our AI-powered assistant is here to answer your questions and guide you through.
      </p>

      <div className="mb-6 z-10 relative">
        <Chatbot />
      </div>

      <div className="mt-4 text-sm text-gray-400 z-10 relative">
        Need more assistance? Visit our{" "}
        <a href="/faq" className="text-purple-400 hover:underline font-medium transition-all">
          FAQ
        </a>{" "}
        or{" "}
        <a href="/contact" className="text-purple-400 hover:underline font-medium transition-all">
          contact us
        </a>
        .
      </div>
    </div>
  );
};

export default Chat;