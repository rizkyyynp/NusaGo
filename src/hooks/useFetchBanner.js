import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useFetchBanner = () => {
    const [banners, setBanners] = useState([]);
    const [maxPage, setMaxPage] = useState(1); // Tambahkan maxPage di sini

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const token = Cookies.get('token'); // Ambil token dari cookies
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    }
                };
                const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners', config);
                const data = response.data.data;
                setBanners(data);
                setMaxPage(Math.ceil(data.length / 6)); // Hitung maxPage berdasarkan jumlah data
            } catch (error) {
                console.error(error);
                setBanners([]);
                setMaxPage(1);
            }
        };

        fetchBanners();
    }, []);

    return { banners, maxPage }; // Kembalikan maxPage di sini
};

export default useFetchBanner;
