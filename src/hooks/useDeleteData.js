import axios from 'axios';
import Cookies from 'js-cookie';

const useDeleteData = () => {
    const deleteData = async (endpoint, id) => {
        const token = Cookies.get('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c', // Pastikan apiKey disesuaikan dengan yang diharapkan
            }
        };
        try {
            const response = await axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${endpoint}/${id}`, config);
            return response; // Mengembalikan respons dari permintaan delete
        } catch (error) {
            throw error; // Melempar error untuk ditangani di komponen
        }
    };

    return { deleteData };
};

export default useDeleteData;
