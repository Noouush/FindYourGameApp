import axios from "axios";

export default axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api",
});

// go on https://cors-anywhere.herokuapp.com/corsdemo and click on "Request temporary access to the demo server"