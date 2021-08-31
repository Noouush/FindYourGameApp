import axios from "axios";

export default axios.create({
    baseURL: "", //URL
    headers: {
        "Content-type": "application/json",
    },
});