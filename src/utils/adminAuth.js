import axios from 'axios';

export async function checkAuthAdmin(context) {
    const { req, res } = context;
    const token = req.cookies.token;

    if (!token) {
        console.log('No token found, redirecting to login.');
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
            console.log('User is not admin, redirecting to login.');
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        // If the user is admin, return the user data as props (optional)
        return {
            props: { user },
        };

    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}
