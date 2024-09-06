import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useFetchPromo = () => {
    const [promos, setPromos] = useState([]);
    const [maxPage, setMaxPage] = useState(1); // Tambahkan maxPage di sini

    
        const fetchPromo = async () => {
            try {
                const token = Cookies.get('token'); // Ambil token dari cookies
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    }
                };
                const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', config);
                const data = response.data.data;
                setPromos(data);
                setMaxPage(Math.ceil(data.length / 6)); // Hitung maxPage berdasarkan jumlah data
            } catch (error) {
                console.error(error);
                setPromos([]);
                setMaxPage(1);
            }
        };
        useEffect(() => {
        fetchPromo();
    }, []);

    return { promos, maxPage, refetch: fetchPromo }; // Kembalikan maxPage di sini
};

export default useFetchPromo;
