import axios from 'axios';

const host = 'https://koa-blog-rest.herokuapp.com';

export const getDB = (db) => (dispatch) => {
  return axios
    .get(`${host}/api/${db}`)
    .then((resp) => resp.data)
    .catch((err) => {});
};

export const getElement = (el) => (dispatch) => {
  return axios
    .get(`${host}/api/${el}`)
    .then((resp) => resp.data)
    .catch((err) => {});
};

export const createElement = (type, val) => (dispatch) => {
  return axios
    .post(`${host}/api/${type}`, val)
    .then((resp) => resp.data)
    .catch((err) => {});
};

export const removeElement = (el) => (dispatch) => {
  return axios
    .delete(`${host}/api/${el}`)
    .then((resp) => resp.data)
    .catch((err) => {});
};

export const updateElement = (el, val) => (dispatch) => {
  return axios
    .put(`${host}/api/${el}`, { name: val })
    .then((resp) => resp.data)
    .catch((err) => {});
};
