import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', 'false');
        return false;
    }
    return false;
};

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: {
        darkMode: getInitialState(),
    },
    reducers: {
        enableDarkMode: (state) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('darkMode', 'true');
            }
            state.darkMode = true;
        },
        disableDarkMode: (state) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('darkMode', 'false');
            }
            state.darkMode = false;
        },
    },
});

export const { enableDarkMode, disableDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
