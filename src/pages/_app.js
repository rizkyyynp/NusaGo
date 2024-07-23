import "@/styles/globals.css";
import { Provider, useSelector } from 'react-redux';
import store from '../redux/store/store';
import React, { useEffect } from "react";

function DarkModeWrapper({ children }) {
    const darkMode = useSelector((state) => state.darkMode.darkMode);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return children;
}

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <DarkModeWrapper>
                <Component {...pageProps} />
            </DarkModeWrapper>
        </Provider>
    );
}

export default MyApp;