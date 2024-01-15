import axios from 'axios';

export const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options) => {
    const response = await request.get(path, options);

    return response.data;
};

export const post = async (path, data, options) => {
    const response = await request.post(path, data, options);

    return response;
};

export const patch = async (path, data, options) => {
    const response = await request.patch(path, data, options);

    return response;
};

export const deleted = async (path, options) => {
    const response = await request.delete(path, options);

    return response;
};
