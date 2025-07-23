// import axios
import api from "./axiosConfig";

//filter out empty key value pairs from params
export function filterParams(params) {
  const queryParams = {};
  Object.entries(params)
    .filter(([key, value]) => value)
    .map(([key, value]) => (queryParams[key] = value));
  return queryParams;
}

function Query() {
  this.api = api;
}


Query.prototype.login = async function (bodyData) {
  try {
    const { data } = await this.api.post("/auth/login", bodyData);
    
    return data;
  } catch (err) {
    if(err?.response.status === 401){
      return {code:err?.response.status,message:err?.response};
    }else{
      let { data } = err?.response;
      return data;
    }
    
  }
};
Query.prototype.getUserDetailsByToken = async function () {
  try {
    const { data } = await this.api.get("/auth/user");
    return data;
  } catch (err) {
    let { data } = err.response;
    return data;
  }
};

Query.prototype.logout = async function () {
  try {
    const { data } = await this.api.get("/auth/logout");
    return data;
  } catch (err) {
    let { data, status } = err.response || {};
    return { data, status };
  }
};

Query.prototype.forgot_password = async function (params) {
  try {
    const { data, status } = await this.api.post(
      `/auth/reset-password?email=${params}
      `
    );
    return { ...data, status };
  } catch (err) {
    let { data, status } = err.response;
    return { ...data, status };
  }
};

Query.prototype.change_password = async function (data) {
  try {
    const { data, status } = await this.api.post("/auth/validate/update", data);
    return { ...data, status };
  } catch (err) {
    let { data, status } = err.response;
    return { ...data, status };
  }
};

//
Query.prototype.userChangePassword = async function (bodyData) {
  try {
    const { data } = await this.api.post("/user/change-password", bodyData);
    return data;
  } catch (err) {
    let { data, status } = err.response;
    return { data, status };
  }
};
Query.prototype.reset_password = async function (token, newPassword) {
  try {
    const { data, status } = await this.api.post(
      `/auth/reset-password/confirm?token=${token}&newPassword=${newPassword}`
    );
    return { ...data, status };
  } catch (err) {
    let { data, status } = err.response;
    return { ...data, status };
  }
};
export default new Query();
