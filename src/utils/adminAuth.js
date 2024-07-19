import axios from 'axios';
import Cookies from 'js-cookie';

export async function checkAuthAdmin(context) {
    const { req, res } = context;
    const token = req.cookies.token;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    try {
        const response = await axios.get(
            'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user',
            {
                headers: {
                    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const user = response.data.data;
        if (user.role !== 'admin') {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
