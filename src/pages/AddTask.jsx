import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

function AddTask() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/dashboard")
    };

    return (
        <div className='w-full h-full bg-black-800 flex justify-center items-center'>
            {isModalOpen && <TaskForm isModalOpen={isModalOpen} closeModal={closeModal} />}
        </div>
    );
}

export default AddTask;
