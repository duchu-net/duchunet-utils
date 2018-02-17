// import { Config } from '../../utils/utils';

const API_SERVER_URL = ''; //Config.get('api.server_url');
const API_ACTIONS = ''; //Config.get('api.actions');


class FetchPromise {
  request = {
    type: 'json',
    timeout: 3000,
  }

  // OVERWRITE
  export() {
    return {};
  }

  createUrl(options) {
    const { type, route, params = {} } = options;
    let url = `${API_SERVER_URL}/${route}`;
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key]);
    });
    return url;
  }

  readAction() {

  }
  createAction() {

  }
  updateAction() {

  }
  deleteAction() {

  }

  createParamsString(params) {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => `${esc(k)}=${esc(params[k])}`)
      .join('&');
    return query;
  }

  fetchUrl(dispatch, getState, fetchOptions) { //uri, fetchData, options) {
    let { url } = fetchOptions;
    const {
      method = 'POST',
      type, params, data,
    } = fetchOptions;
    const state = getState();
    const { Auth = {} } = state;

    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    };
    if (Auth.isAuth && Auth.token) {
      headers['access-token'] = Auth.token;
    }

    if (params) {
      url += `?${this.createParamsString(params)}`;
    }
    // console.log(url);

    const fetchPromise = fetch(url, {
      // ...fetchData,
      body: JSON.stringify(data),
      method: method,
      credentials: 'same-origin',
      headers: headers,
    })

    return Promise.resolve()
      .then(() => {
        this.dispatchApiAction(dispatch, type, 'REQUEST');
        return true;
      })
      .then(() => this.raceTimeout(fetchPromise))
      .then((response) => this.fetchResponse(response))
      .then((response) => {
        this.dispatchApiAction(dispatch, type, 'SUCCESS', response);
        return response;
      })
      .catch((err) => {
        this.dispatchApiAction(dispatch, type, 'FAILURE', err);
        if (err instanceof TypeError) {
          throw new ApiError('connection');
        }
        throw err;
      });
  }

  dispatchApiAction(dispatch, actionType, type, payload) {
    let responseType;
    switch (type) {
      case 'REQUEST':
      case 'SUCCESS':
      case 'FAILURE':
        responseType = `${actionType}_${type}`;
        break;
      default: responseType = `${actionType}_FAILURE`;
    }

    let addedToAction = {};
    switch (type) {
      case 'SUCCESS':
        addedToAction = { payload: payload };
        break;
      case 'FAILURE':
        addedToAction = { error: payload, payload: payload };
        break;
    }

    return dispatch({
      type: responseType,
      meta: { api: true },
      ...addedToAction,
    });
  }

  fetchResponse(response) {
    return Promise.resolve()
      .then(() => {
        // console.log(response);
        if (response.ok) {
          const { type } = this.request;
          return response[type]();
        }
        if (response.status) {
          // throw new FetchError(data);
          return this.apiError(response);
        }
        throw new ApiError('network');
      })
      // .catch(err => {
      //   console.log('>>> ', {...err});
      //   throw err;
      // })
  }
  apiError(response) {
    return Promise.resolve()
      .then(() => response.json())
      .then((data) => { throw new FetchError(response.status, data); })
      .catch((err) => {
        console.warn('apiError', err);
        throw err;
      })
  }
  raceTimeout(promises) {
    if (!Array.isArray(promises)) promises = [promises];
    return Promise.race([ this.timeout(), ...promises ]);
  }
  timeout() {
    const { timeout } = this.request;
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new ApiError('timeout')), timeout);
    });
  }


  clearEventsReducer() {
    return {
      type: C.REDUCER_CLEAR_EVENTS,
    }
  }
}



class ApiError {
  static uxMessages = {
    timeout: 'serwer nie odpowiada',
    network: 'problem z siecią',
    connection: 'problem z połączeniem',
    UNDEFINED_ERROR: '_UNDEFINED_ERROR',
  }

  constructor(type) {
    this.name = 'ApiError';
    this.type = type || 'UNDEFINED_ERROR';
    // this.user = this.getUserMessage(type);
    // this.data = data;
    // this.errors = data.errors;
    // this.stack = (new Error()).stack;
  }

  get userMessage() {
    return ApiError.uxMessages[this.type] || '_NO_MESSAGE';
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}

class FetchError {
  constructor(message, data) {
    this.name = 'FetchError';
    this.message = message || 'UNDEFINED ERROR';
    this.data = data;
    this.errors = data.errors;
    this.stack = (new Error()).stack;
  }
  toString() {
    return `${this.name}: ${this.message}`;
  }
}
// FetchError.prototype = new Error;

module.exports = FetchPromise;
