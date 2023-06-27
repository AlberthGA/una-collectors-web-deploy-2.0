"use client"
import React from 'react';

interface NextButtonProps {
    onMouseClick?: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onMouseClick }) => {
    return (
        <button onClick={onMouseClick} className="inline-flex items-center px-4 py-2 text-sm font-medium  bg-buttonsColor border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <p className='text-white'>Siguiente</p>
            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
    );
}

export default NextButton;