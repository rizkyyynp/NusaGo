export async function checkAuth(context) {
    const { req } = context;
    const token = req.cookies.token;

    if (token) {
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