import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useFetchCategory = () => {
    const [category, setCategory] = useState([]);
    const [maxPage, setMaxPage] = useState(1); // Tambahkan maxPage di sini

    
        const fetchCategory = async () => {
            try {
                const token = Cookies.get('token'); // Ambil token dari cookies
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    }
                };
                const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', config);
                const data = response.data.data;
                setCategory(data);
                setMaxPage(Math.ceil(data.length / 6)); // Hitung maxPage berdasarkan jumlah data
            } catch (error) {
                console.error(error);
                setCategory([]);
                setMaxPage(1);
            }
        };
        useEffect(() => {
        fetchCategory();
    }, []);

    return { category, maxPage, refetch: fetchCategory }; // Kembalikan maxPage di sini
};

export default useFetchCategory;
