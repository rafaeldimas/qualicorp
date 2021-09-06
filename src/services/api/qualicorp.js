import axios from "axios";

const api = axios.create({
  baseURL: 'http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com',
  params: {
    'api-key': process.env.VUE_APP_QUALICORP_API_TOKEN
  }
});

export const profissions = (state, city, params) => {
  return api.get(`profissao/${state}/${city}`, { params });
}

export const entities = (profission, state, city, params) => {
  return api.get(`entidade/${profission}/${state}/${city}`, { params });
}

export const plans = (data) => {
  return api.post('plano', data);
}
