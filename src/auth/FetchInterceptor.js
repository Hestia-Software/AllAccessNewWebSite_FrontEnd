import axios from 'axios'
import PrefixPath from '../config/AppConfig'
import Constants from '../redux/constants/AuthConstant';
import { notification } from 'antd';
import { removeCookie,getCookie } from '../utils/AllCookies';



const service = axios.create({
  baseURL: PrefixPath.API_BASE_URL,
  timeout: 60000
})

// const ENTRY_ROUTE = '/auth/login'
const TOKEN_PAYLOAD_KEY = 'authorization'
// const PUBLIC_REQUEST_KEY = 'public-request'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = getCookie(Constants.AUTH_TOKEN)
  if (jwtToken && Object.keys(jwtToken).length > 0) {
    config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken?.token}`
  }

//   if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {

//   }

  return config
}, error => {
	notification.error({
		message: 'Error'
	})
  Promise.reject(error)
})

service.interceptors.response.use( (response) => {
	return response.data
}, (error) => {

	let notificationParam = {
		message: ''
	}
	
	if (error.response.status === 400) {
		notificationParam.message = 'bad request'
		notificationParam.description = 'Please fill correct data'

		//removeCookie(Constants.AUTH_TOKEN)
		//window.location.reload();
	}
	if (error.response.status === 401 || error.response.status === 403) {
		notificationParam.message = 'Authentication Fail'
		notificationParam.description = 'Please login again'

		removeCookie(Constants.AUTH_TOKEN)
		//window.location.reload();
	}
	if (error.response.status === 404) {
		notificationParam.message = 'Not Found'
	}

	if (error.response.status === 500) {
		notificationParam.message = 'Internal Server Error'
	}
	
	if (error.response.status === 508) {
		notificationParam.message = 'Time Out'
	}

	notification.error(notificationParam)

	return Promise.reject(error);
});

export default service