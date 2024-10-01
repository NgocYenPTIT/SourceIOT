import axios from "axios";
const fetchGetdf = async (url, listParam) => {
    try {
        const client = axios.create({
            baseURL: url,
            params: listParam
        })
        return (await client.get()).data;
    } catch (error) {
        throw new Error(error);
    }
}
export default fetchGetdf;