import axios from "axios";

export default function useImageUpload() {
    const uploadImage = async (url, body) => {
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
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        uploadImage,
    };
}
