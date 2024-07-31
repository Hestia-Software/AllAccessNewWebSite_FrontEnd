import Constants from '../../constants/AuthConstant';

const initialState = {
    loading: false,
    tenant: {},
    CreateTenant:{},
    error: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.FETCH_USER_SUCCESS:
            return {
                loading: false,
                maintenance: action.payload,
                error: '',
            };
        case Constants.FETCH_USER_FAILURE:
            return {
                loading: false,
                maintenance: {},
                error: action.payload,
            };
        default:
            return state;
    }
};
export const tenantReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.TENANT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.TENANT_SUCCESS:
            return {
                loading: false,
                tenant: action.payload,
                error: '',
            };
        case Constants.TENANT_FAILURE:
            return {
                loading: false,
                tenant: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const CreateTenantReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.CREATE_TENANT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.CREATE_TENANT_SUCCESS:
            return {
                loading: false,
                CreateTenant: action.payload,
                error: '',
            };
        case Constants.CREATE_TENANT_FAILURE:
            return {
                loading: false,
                CreateTenant: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default userReducer;
