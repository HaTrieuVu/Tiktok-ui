import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// custom lai get (lay luon ra data)
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);

    return response.data;
};

export default httpRequest;

//dung o file apiService - searchService
