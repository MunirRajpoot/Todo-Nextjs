import React, { useState } from 'react';

const Todo = ({ id, title, description, mongoId, complete, deleteTodo, completeTodo }) => {
    const [isCompleted, setIsCompleted] = useState(complete);
    const [showButtons, setShowButtons] = useState(true);

    const handleComplete = async () => {
        await completeTodo(mongoId);
        setIsCompleted(true);
        setShowButtons(false);
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id + 1}
            </th>
            <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
                {title}
            </td>
            <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
                {description}
            </td>
            <td className="px-6 py-4">
                {isCompleted ? "Completed" : "Pending"}
            </td>
            <td className="px-6 py-4 flex gap-1">
                {showButtons && (
                    <>
                        <button onClick={() => deleteTodo(mongoId)} className='py-2 px-4 bg-red-500 text-white'>Delete</button>
                        {!isCompleted && (
                            <button onClick={handleComplete} className='py-2 px-4 bg-green-500 text-white'>Done</button>
                        )}
                    </>
                )}
            </td>
        </tr>
    );
};

export default Todo;
