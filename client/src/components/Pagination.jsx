// Pagination.jsx
import React from "react";
import "../buttons.css";

function Pagination({ currentPage, totalPages, setCurrentPage, scrollToTop }) {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          setCurrentPage(1);
          scrollToTop();
        }}
        disabled={currentPage === 1}
      >
        Home
      </button>
      <button
        onClick={() => {
          setCurrentPage((prev) => Math.max(prev - 1, 1));
          scrollToTop();
        }}
        disabled={currentPage === 1}
      >
        « Newer
      </button>
      <button
        onClick={() => {
          setCurrentPage((prev) => Math.min(prev + 1, totalPages));
          scrollToTop();
        }}
        disabled={currentPage >= totalPages}
      >
        Older »
      </button>
    </div>
  );
}

export default Pagination;
