"use client";

import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { IoCheckmark } from "react-icons/io5";

const page = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Order Placed Successfully!
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for your purchase
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                What's next?
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center">
                      <IoCheckmark className="text-green-600" />
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    You'll receive an order confirmation email shortly
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center">
                      <IoCheckmark className="text-green-600" />
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    Your order will be processed within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                View Order Details
              </button>
            </div>
            <div className="mt-4">
              <Link
                href="/"
                className="w-full flex justify-center py-2 px-4 text-sm font-medium text-green-600 bg-white hover:text-green-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;
