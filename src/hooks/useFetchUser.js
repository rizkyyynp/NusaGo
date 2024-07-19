import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useFetchUser = () => {
    const [users, setUsers] = useState([]);
    const [maxPage, setMaxPage] = useState(1); // Tambahkan maxPage di sini

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = Cookies.get('token'); // Ambil token dari cookies
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    }
                };
                const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', config);
                const data = response.data.data;
                setUsers(data);
                setMaxPage(Math.ceil(data.length / 8)); // Hitung maxPage berdasarkan jumlah data
            } catch (error) {
                console.error(error);
                setUsers([]);
                setMaxPage(1);
            }
        };

        fetchUsers();
    }, []);

    return { users, maxPage }; // Kembalikan maxPage di sini
};

export default useFetchUser;
