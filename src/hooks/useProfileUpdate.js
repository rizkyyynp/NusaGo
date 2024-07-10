import axios from 'axios';
import Cookies from 'js-cookie';

const useProfileUpdate = () => {
    const updateProfile = async (endpoint, data) => {
        const token = Cookies.get('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        };
        try {
            const response = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${endpoint}`, data, config);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return { updateProfile };
};

export default useProfileUpdate;
