"use client"
import React from 'react';

interface PreviousButtonProps {
    onMouseClick?: () => void;
}

const PreviousButton: React.FC<PreviousButtonProps> = ({ onMouseClick }) => {
    return (
        <button onClick={onMouseClick} className="inline-flex items-center px-4 py-2 text-sm font-medium bg-buttonsColor rounded-l hover:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
            <p className='text-white'>Anterior</p>
        </button>
    );
}

export default PreviousButton;