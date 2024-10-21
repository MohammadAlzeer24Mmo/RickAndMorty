import React from 'react';

const Pagination: React.FC = () => {
  return (
    <div className="flex items-center absolute left-0 right-0 bottom-[-54px] justify-center">
      <div className="flex items-center space-x-2">
        <button className="pagination-arrow">
          ←
        </button>

        <ul className="flex space-x-2">
          {[1, 2, 3, 4].map((number) => (
            <li key={number}>
              <button className="pagination-btn text-sm sm:text-base">
                {number}
              </button>
            </li>
          ))}
        </ul>

        <button className="pagination-arrow">
          →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
