import React, { useState, useEffect } from 'react';


function Pagination({currentPageNum, totalPages, onPageChange}) {

    const handleNext=()=>{
        onPageChange(currentPageNum+1);
    }
    const handlePrev=()=>{
        if(currentPageNum > 1){
           onPageChange(currentPageNum-1);
        }
    }

  return (
    <div className='flex justify-center m-8 pt-10 gap-8'>
        <div onClick={handlePrev}>
            <i className='font-bold text-2xl  bg-gray-200 hover:bg-blue-200 py-2 px-3 cursor-pointer'>Prev</i>
            
        </div>
        <div className='font-bold text-2xl'>{currentPageNum} / {totalPages}</div>
        <div onClick={handleNext}>
            <i className='font-bold text-2xl bg-gray-200 hover:bg-blue-200 py-2 px-3 cursor-pointer'>Next</i>
        </div>
    </div>
  )
}

export default Pagination