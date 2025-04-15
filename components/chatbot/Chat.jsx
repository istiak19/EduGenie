import Chatbot from "./Chatbot";

const Chat = () => {
  return (
    <div className="bg-slate-50 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto mb-12 border border-indigo-100 w-full text-center">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">
        How can we help you today?
      </h2>
      <p className="text-md text-slate-600 mb-6">
        Our AI-powered assistant is here to answer your questions and guide you through.
      </p>

      <div className="mb-6">
        <Chatbot />
      </div>

      <div className="mt-4 text-sm text-slate-400">
        Need more assistance? Visit our{" "}
        <a href="/faq" className="text-rose-500 hover:underline font-medium">
          FAQ
        </a>{" "}
        or{" "}
        <a href="/contact" className="text-rose-500 hover:underline font-medium">
          contact us
        </a>
        .
      </div>
    </div>
  );
};

export default Chat;
