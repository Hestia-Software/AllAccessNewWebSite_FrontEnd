import Constants from '../../constants/AuthConstant';

const initialState = {
    loading: false,
    maintenance: {},
    CreateMaintenance:{},
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
export const maintenanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.MAINTENANCE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.MAINTENANCE_SUCCESS:
            return {
                loading: false,
                maintenance: action.payload,
                error: '',
            };
        case Constants.MAINTENANCE_FAILURE:
            return {
                loading: false,
                maintenance: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const CreateMaintenanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.CREATE_MAINTENANCE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.CREATE_MAINTENANCE_SUCCESS:
            return {
                loading: false,
                CreateMaintenance: action.payload,
                error: '',
            };
        case Constants.CREATE_MAINTENANCE_FAILURE:
            return {
                loading: false,
                CreateMaintenance: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default userReducer;
