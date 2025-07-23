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


Query.prototype.getAgents = async function (paraMeters) {
  try {
    const { data } = await this.api.post("/user", paraMeters);    
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

Query.prototype.addNewAgent = async function (paraMeters) {
  try {
    const { data } = await this.api.post("/auth/register", paraMeters, {
      headers: { "Content-Type": "multipart/form-data" },
    });    
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

Query.prototype.updateAgent = async function (paraMeters) {
  try {
    const { data } = await this.api.put(`/user`, paraMeters, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
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
Query.prototype.getAgentDetail = async function (agentId) {
  try {
    const { data } = await this.api.get(`/user/${agentId}`);
    
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

export default new Query();
