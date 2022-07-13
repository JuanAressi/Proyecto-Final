import queryString from "query-string";
import axios from "axios";

let dispatch;
const API_ROOT = process.env.REACT_APP_API_ROOT;

// Create Axios Instance.
const axiosInstance = axios.create({
    baseURL: API_ROOT,
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },

    function (error) {
        if (error.response && error.response.status === 401) {
            dispatch({ type: "LOGOUT" });
        }

        return Promise.reject(error);
    }
);


// Function serializeUrlParams.
const serializeUrlParams = (obj, append = false) => {
    return append ? "" : "?" + queryString.stringify(obj);
};


// API Agent.
const apiAgent = {
    get: (url, params) =>
		axiosInstance.get(url + serializeUrlParams(params)).then((res) => {
			debugger
            if (!res.statusText === "OK") {
                throw res.data;
            }

            return res.data;
        }),

    post: (url, data) =>
        axiosInstance.post(url, data).then((res) => {
            if (!res.statusText === "OK") {
                throw res.body;
            }

            return res.data;
        }),

    put: (url, data) =>
        axiosInstance.put(url, data).then((res) => {
            if (!res.statusText === "OK") {
                throw res.data;
            }

            return res.data;
        }),

    delete: (url) =>
        axiosInstance.delete(url).then((res) => {
            if (!res.statusText === "OK") {
                throw res.data;
            }

            return res.data;
        }),
};


// User.
const user = {
    all: (params) => apiAgent.get("/users", ''),
    post: (item) => apiAgent.post("/user", item),
    put: (item) => apiAgent.put("/user/" + item.id, item),
    delete: (item) => apiAgent.delete("/user/" + item.id),
    getById: (id) => apiAgent.get("/user/" + id),
    validate: {
        email: ({ mail, exceptMe }) =>
        apiAgent.post(`user/validate/mail`, { mail, exceptMe }),
    },
};


// Export.
export default {
    apiAgent,
    user,
};
