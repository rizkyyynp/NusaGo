import axios from 'axios';

const API_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        apiKey: API_KEY,
    },
});

export async function fetchPromos() {
    try {
        const res = await axiosInstance.get('/promos');
        return res.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchCategories() {
    try {
        const res = await axiosInstance.get('/categories');
        return res.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchActivities() {
    try {
        const res = await axiosInstance.get('/activities');
        return res.data.data;
    } catch (error) {
        console.error(error);
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
