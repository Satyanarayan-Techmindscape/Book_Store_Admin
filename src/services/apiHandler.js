import axios from "axios";

const baseURL = "https://yrpitsolutions.com/Bookstore_API/";
const apiRequest = async (method, endpoint, data) => {
  try {
    // let config = {
    //   Authorization: "Bearer " + localStorage.getItem("token"),
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    // };

    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: baseURL + endpoint,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        // "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    const result = await axios.request(config);

    // const result = await axios({
    //   method,
    //   maxBodyLength: Infinity,
    //   url: baseURL + endpoint,
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   data: data,
    //   // config,
    // });
    return {
      response: true,
      // status: result.status,
      error: null,
      data: result.data,
    };
  } catch (error) {
    return {
      response: false,
      // status: error.response.status,
      // error: error.response.data.errors.message,
      // data: error.response.data.errors,
    };
  }
};

export const get = (endpoint) => apiRequest("get", endpoint, null);
export const post = (endpoint, data) => apiRequest("post", endpoint, data);
export const put = (endpoint, data) => apiRequest("put", endpoint, data);
export const remove = (endpoint, data) => apiRequest("delete", endpoint, data);
