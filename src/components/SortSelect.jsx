import React from 'react';
import { ChevronDown } from 'lucide-react';

const SortSelect = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'name', label: 'За назвою (А-Я)' },
    { value: 'name-desc', label: 'За назвою (Я-А)' },
    { value: 'free', label: 'Безкоштовні спочатку' },
    { value: 'paid', label: 'Платні спочатку' },
    { value: 'api', label: 'З API спочатку' }
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none block w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SortSelect; 