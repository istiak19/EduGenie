'use client';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, onClose, planName }) => {
  if (!isOpen) return null;

  const planDetails = {
    Basic: {
      description: "The Basic Plan includes access to basic courses and email support.",
      features: ["Access to basic courses", "Email support", "Basic features"],
    },
    Pro: {
      description: "The Pro Plan includes access to all courses with priority support.",
      features: ["Access to all courses", "Priority support", "Advanced features"],
    },
    Enterprise: {
      description: "The Enterprise Plan provides custom training solutions and dedicated support.",
      features: ["Custom training solutions", "Dedicated account manager", "Advanced analytics"],
    },
  };

  const { description, features } = planDetails[planName] || {};

  return (
    <div className="z-10 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="font-bold text-teal-600 text-2xl">{planName} Plan Details</h2>
        <p className="mt-4">{description}</p>
        <ul className="mt-4">
          {features && features.map((feature, index) => (
            <li key={index} className="text-teal-500">{feature}</li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="bg-teal-400 hover:bg-teal-500 mt-4 px-4 py-2 rounded-full font-semibold text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onConfirm, onClose, planName }) => {
  if (!isOpen) return null;

  return (
    <div className="z-20 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="font-bold text-teal-600 text-2xl">Confirm Subscription</h2>
        <p className="mt-4">Are you sure you want to subscribe to the {planName} plan?</p>
        <div className="flex justify-around mt-4">
          <button
            onClick={onConfirm}
            className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-full font-semibold text-white"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-full font-semibold text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const EducatorAndSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handlePlanClick = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const handleSubscriptionClick = (planName) => {
    setIsConfirmationOpen(true);
  };

  const confirmSubscription = () => {
    toast.success(`You have successfully subscribed to the ${selectedPlan} plan!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setIsConfirmationOpen(false);
  };

  const handleCancelSubscription = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div className="bg-teal-50 mx-auto px-4 py-12 container">
      <div className="space-y-12 mx-auto max-w-5xl">
        {/* Become an Educator Section */}
        <section className="text-center">
          <h2 className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide">Become an Educator</h2>
          <p className="mb-4 text-base sm:text-lg lg:text-xl leading-relaxed">Share your knowledge with a global audience. Join us today and make an impact!</p>
          <Link href="/apply" passHref>
            <button className="bg-teal-400 hover:bg-teal-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-white hover:scale-105 transition duration-300 transform">
              Apply Now
            </button>
          </Link>
        </section>

        {/* Subscription Plans Section */}
        <section className="text-center">
          <h2 className="mb-6 sm:mb-8 lg:mb-12 font-bold text-teal-700 text-2xl sm:text-3xl lg:text-4xl tracking-wide">Our Subscription Plans</h2>
          <div className="gap-6 sm:gap-8 lg:gap-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className={`bg-white shadow-lg hover:shadow-xl p-6 sm:p-8 rounded-lg hover:scale-105 transition duration-300 transform ${selectedPlan === 'Basic' ? 'border-4 border-teal-500' : ''}`}
              onClick={() => handlePlanClick('Basic')}
            >
              <h3 className="mb-4 font-bold text-teal-500 text-lg sm:text-xl lg:text-2xl">Basic Plan</h3>
              <p className="mb-4 text-teal-500 text-base sm:text-lg lg:text-xl">$9.99/month</p>
              <ul className="mb-4 text-gray-600">
                <li>Access to basic courses</li>
                <li>Email support</li>
                <li>Basic features</li>
              </ul>
              <button
                onClick={() => handleSubscriptionClick('Basic')}
                className="bg-teal-400 hover:bg-teal-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-white hover:scale-105 transition duration-300 transform"
              >
                Subscribe Now
              </button>
            </div>

            <div
              className={`bg-white shadow-lg hover:shadow-xl p-6 sm:p-8 rounded-lg hover:scale-105 transition duration-300 transform ${selectedPlan === 'Pro' ? 'border-4 border-teal-600' : ''}`}
              onClick={() => handlePlanClick('Pro')}
            >
              <h3 className="mb-4 font-bold text-teal-600 text-lg sm:text-xl lg:text-2xl">Pro Plan</h3>
              <p className="mb-4 text-teal-600 text-base sm:text-lg lg:text-xl">$19.99/month</p>
              <ul className="mb-4 text-gray-600">
                <li>Access to all courses</li>
                <li>Priority support</li>
                <li>Advanced features</li>
              </ul>
              <button
                onClick={() => handleSubscriptionClick('Pro')}
                className="bg-teal-500 hover:bg-teal-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-white hover:scale-105 transition duration-300 transform"
              >
                Subscribe Now
              </button>
            </div>

            <div
              className={`bg-white shadow-lg hover:shadow-xl p-6 sm:p-8 rounded-lg hover:scale-105 transition duration-300 transform ${selectedPlan === 'Enterprise' ? 'border-4 border-teal-700' : ''}`}
              onClick={() => handlePlanClick('Enterprise')}
            >
              <h3 className="mb-4 font-bold text-teal-700 text-lg sm:text-xl lg:text-2xl">Enterprise Plan</h3>
              <p className="mb-4 text-teal-700 text-base sm:text-lg lg:text-xl">Contact us for pricing</p>
              <ul className="mb-4 text-gray-600">
                <li>Custom training solutions</li>
                <li>Dedicated account manager</li>
                <li>Advanced analytics</li>
              </ul>
              <button
                onClick={() => handleSubscriptionClick('Enterprise')}
                className="bg-teal-600 hover:bg-teal-700 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-white hover:scale-105 transition duration-300 transform"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} planName={selectedPlan} />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onConfirm={confirmSubscription}
        onClose={handleCancelSubscription}
        planName={selectedPlan}
      />
    </div>
  );
};


export default EducatorAndSubscription;
