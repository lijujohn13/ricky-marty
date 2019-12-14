import axios from 'axios';

export default async (config) => {
    const headers = {};
    const reqConfig = Object.assign({}, config);
    if (config.method === 'POST') {
        headers['content-type'] = 'application/json';
        reqConfig.data = JSON.stringify(config.data);
    }

    if (!config.method) {
        reqConfig.method = 'GET';
    }

    reqConfig.headers = headers;
    try {
        const resp = await axios(reqConfig);
        return resp;
    } catch (ex) {
        throw ex;
    }
};
