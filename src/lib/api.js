import axios from 'axios';

const API_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        apiKey: API_KEY,
    },
});

export async function fetchBanners() {
    try {
        const res = await axiosInstance.get('/banners');
        return res.data.data;
    } catch (error) {
        console.error('Error fetching banner:', error);
        return [];
    }
}

export async function fetchPromos() {
    try {
        const res = await axiosInstance.get('/promos');
        return res.data.data;
    } catch (error) {
        return [];
    }
}


export async function fetchCategories() {
    try {
        const res = await axiosInstance.get('/categories');
        return res.data.data;
    } catch (error) {
        return [];
    }
}


export async function fetchActivities() {
    try {
        const res = await axiosInstance.get('/activities');
        return res.data.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network Error:', error.request);
        } else {
            // Something else caused an error
            console.error('Error:', error.message);
        }
        return [];
    }
}


export async function fetchActivitiesByCategory(categoryId) {
    try {
        const res = await axiosInstance.get(`/activities-by-category/${categoryId}`);
        return res.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchPromoById(id) {
    try {
        const res = await axiosInstance.get(`/promo/${id}`);
        return res.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchActivityById(id) {
    try {
        const res = await axiosInstance.get(`/activity/${id}`);
        return res.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}