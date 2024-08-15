import "@/styles/globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider, useSelector } from 'react-redux';
import store from '../redux/store/store';
import React, { useEffect } from "react";
import Head from "next/head";

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
                <Head>
                    <title>NusaGo Travel</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="NusaGo Travel Website" />
                </Head>
                <Component {...pageProps} />
            </DarkModeWrapper>
        </Provider>
    );
}

export default MyApp;