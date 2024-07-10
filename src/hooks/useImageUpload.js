import axios from "axios";
import Cookies from "js-cookie";

export default function useImageUpload() {
    const uploadImage = async (url, formData) => {
        try {
            const token = Cookies.get("token");
            const response = await axios.post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                formData,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
    };

    return { uploadImage };
}
