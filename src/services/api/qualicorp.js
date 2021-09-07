import axios from "axios";

const api = axios.create({
  baseURL: 'https://lb-aws-1105894158.sa-east-1.elb.amazonaws.com',
});

export const profissions = (state, city, params) => {
  return api.get(`profissao/${state}/${city}`, {
    params: {
      ...params,
      'api-key': process.env.VUE_APP_QUALICORP_PROFISSION_API_TOKEN
    }
  });
}

export const entities = (profission, state, city, params) => {
  return api.get(`entidade/${profission}/${state}/${city.toUpperCase()}`, {
    params: {
      ...params,
      'api-key': process.env.VUE_APP_QUALICORP_ENTITY_API_TOKEN
    }
  });
}

export const plans = (data) => {
  return api.post('plano', data, {
    params: {
      'api-key': process.env.VUE_APP_QUALICORP_PLANS_API_TOKEN
    }
  });
}
