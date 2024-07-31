import {env} from './EnvirementConfig';
class PrefixPath{
    static APP_NAME = 'AAM';
    static API_BASE_URL = env.API_ENDPOINT_URL
    static APP_PREFIX_PATH = '/app';
    static AUTH_PREFIX_PATH = '/auth';
}
export default PrefixPath;