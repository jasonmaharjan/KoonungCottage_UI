import axios from "axios";

const BASE_URL = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/";

export const getEntries = async (path) => {
    const res = await axios.get(BASE_URL + path);
    // console.log(res);
    return res.data.entries;
};

export const getEntriesWithParams = async (path, params) => {
    const res = await axios.get(BASE_URL + path, { params: params });
    // console.log(res);
    return res.data.entries;
};
