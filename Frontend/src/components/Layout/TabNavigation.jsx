import React from 'react';

const TabNavigation = ({ activeTab, onTabChange, commentCount = 25 }) => {
  const tabs = ["Thoughts", "Top Holders", "Activity"];
  
  return (
    <div className="mb-6">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium relative cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {tab === "Thoughts" && (
              <span className="ml-1 text-xs text-gray-400">({commentCount})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;