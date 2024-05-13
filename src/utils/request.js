import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

// custom lai get (lay luon ra data)
export const get = async (path, options = {}) => {
    const response = await request.get(path, options);

    return response.data;
};

export default request;

//dung o file apiService - searchService
