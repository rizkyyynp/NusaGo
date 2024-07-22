import axios from "axios";
import Cookies from "js-cookie";

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
                Cookies.set('token', response.data.token);
            }
            return response;
        } catch (error) {
            return error;
        }
    };

    const userLog = async (url, callback) => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("No token found");
            }
            const response = await axios.get(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (url === "logout") {
                Cookies.remove('token');
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
