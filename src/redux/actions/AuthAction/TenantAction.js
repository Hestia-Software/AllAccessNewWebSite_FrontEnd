import Constants from '../../constants/AuthConstant';
class TenantAction {
   

static  fetchUserRequest = () => ({
    type: Constants.FETCH_USER_REQUEST,
});

static fetchUserSuccess = (user) => ({
    type: Constants.FETCH_USER_SUCCESS,
    payload: user,
});

static fetchUserFailure = (error) => ({
    type: Constants.FETCH_USER_FAILURE,
    payload: error,
});

static TenantRequest = (credentials) => ({
    type: Constants.TENANT_REQUEST,
    payload: credentials,
});

static TenantSuccess = (user) => ({
    type: Constants.TENANT_SUCCESS,
    payload: user,
});

static TenantFailure = (error) => ({
    type: Constants.TENANT_FAILURE,
    payload: error,
});


static CreateTenantRequest = (credentials) => ({
    type: Constants.CREATE_TENANT_REQUEST,
    payload: credentials,
});

static CreateTenantSuccess = (user) => ({
    type: Constants.CREATE_TENANT_SUCCESS,
    payload: user,
});

static CreateTenantFailure = (error) => ({
    type: Constants.CREATE_TENANT_FAILURE,
    payload: error,
});
}

export default TenantAction;