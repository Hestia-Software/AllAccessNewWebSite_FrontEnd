import {BaseUrl,BaseUrl1} from './BaseUrlConst';
import fetch from '../auth/FetchInterceptor'
const JwtAuthService = {}
JwtAuthService.getAPI = function (data,endPoint) {
    return fetch({
        url: `${BaseUrl}${endPoint}`,
        method: 'GET',
        // headers: {
        //     'Accept': '*/*',
        //     'Content-Type': 'application/json',
        // },
        data: data
    });
}
JwtAuthService.postApi = function (data,endPoint) {

    return fetch.post(`${BaseUrl1}${endPoint}`, data);
}
JwtAuthService.updateApi = function (data,endPoint) {

    return fetch.put(`${BaseUrl1}${endPoint}`, data);
}
JwtAuthService.deleteApi = function (data,endPoint) {
    return fetch({
        url: `${BaseUrl}${endPoint}`,
        method: 'DELETE',
        data: data
    });
}

export default JwtAuthService