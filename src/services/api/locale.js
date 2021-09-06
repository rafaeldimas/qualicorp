import axios from "axios";

const api = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export const states = (params) => {
  return api.get('estados', { params });
}

export const cities = (state, params) => {
  return api.get(`estados/${state}/municipios`, { params });
}
