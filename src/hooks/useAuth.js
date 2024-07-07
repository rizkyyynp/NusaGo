import axios from "axios";

export default function useAuth() {
    const authenticate = async (url, body) => {
        try {
            const response = await axios.post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                body,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    },
                }
            );
            if (response.status === 200) {
                document.cookie = `token=${response.data.token}; path=/;`;
            }
            return response;
        } catch (error) {
            return error;
        }
    };

    const userLog = async (url, callback) => {
        try {
            const response = await axios.get(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (url === "logout") {
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                callback(response);
            } else {
                callback(response.data.data);
            }
        } catch (error) {
            return error;
        }
    };

    return {
        authenticate,
        userLog,
    };
}
