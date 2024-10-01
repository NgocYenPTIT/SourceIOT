import axios from "axios";
const fetchGet = async (url, listParam) => {
    try {
        const client = axios.create({
            baseURL: url,
            params: listParam
        });
        client.defaults.withCredentials = true; 
        return (await client.get()).data;
    } catch (error) {
        throw new Error(error);
    }
}
export default fetchGet;
