import axios from "axios";
const fetchDelete = async (url, body) => {
    try {
        const client = axios.create({
            baseURL: url
        });
        client.defaults.withCredentials = true;
        return (await client.delete(url ,{ data: body })).data;
    } catch (error) {
        throw new Error(error);
    }
}
export default fetchDelete;