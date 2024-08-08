"use client";
import React from "react";

const PageControl = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageButtons = () => {
    let pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`btn ${currentPage === i ? "btn-active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div className=" flex justify-center flex-wrap  mt-4 ">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn"
      >
        Previous
      </button>
      {renderPageButtons()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn"
      >
        Next
      </button>
    </div>
  );
};

export default PageControl;
