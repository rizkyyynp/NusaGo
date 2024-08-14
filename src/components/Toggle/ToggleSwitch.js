import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enableDarkMode, disableDarkMode } from '../../redux/slices/darkModeSlice';

const ToggleSwitch = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.darkMode.darkMode);

    const handleToggle = () => {
        if (darkMode) {
            dispatch(disableDarkMode());
        } else {
            dispatch(enableDarkMode());
        }
    };

    return (
        <div className="flex justify-center items-center my-5 mr-5">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkMode}
                    onChange={handleToggle}
                />
                <div
                    className="w-10 h-10 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-0 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-primary-gradient after:rounded-full after:top-0 after:right-0 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0 animate-bounce"
                ></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;