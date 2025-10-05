import React from 'react';
import CommentList from '../Comments/CommentList';

const TabContent = ({ activeTab, ...props }) => {
  switch (activeTab) {
    case "Thoughts":
      return <CommentList {...props} />;
    case "Top Holders":
      return (
        <div className="text-center text-gray-500 py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.196-2.121M9 20h8v-2a3 3 0 00-5.196-2.121m0 0a5.002 5.002 0 019.392 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Top Holders
          </h3>
          <p className="text-gray-500">
            View the most active community members and their contributions.
          </p>
        </div>
      );
    case "Activity":
      return (
        <div className="text-center text-gray-500 py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Activity Feed
          </h3>
          <p className="text-gray-500">
            Track recent interactions, likes, and community engagement.
          </p>
        </div>
      );
    default:
      return <CommentList {...props} />;
  }
};

export default TabContent;