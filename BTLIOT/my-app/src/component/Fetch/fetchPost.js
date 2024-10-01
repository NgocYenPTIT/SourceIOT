import axios from "axios";
const fetchPost = async (url, body) => {
    try {
        const client = axios.create({
            baseURL: url,
        },);
        client.defaults.withCredentials = true;
        const x = await client.post(url, body);
        return x.data;
    } catch (error) {
        console.log(error);
    }
}
export default fetchPost;