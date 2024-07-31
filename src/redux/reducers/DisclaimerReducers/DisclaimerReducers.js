import Constants from '../../constants/AuthConstant';

const initialState = {
    loading: false,
    disclaimer: {},
    CreateDisclaimer:{},
    GetAllDisclaimer:{},
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
                disclaimer: action.payload,
                error: '',
            };
        case Constants.FETCH_USER_FAILURE:
            return {
                loading: false,
                disclaimer: {},
                error: action.payload,
            };
        default:
            return state;
    }
};
export const disclaimerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.DISCLAIMER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.DISCLAIMER_SUCCESS:
            return {
                loading: false,
                disclaimer: action.payload,
                error: '',
            };
        case Constants.DISCLAIMER_FAILURE:
            return {
                loading: false,
                disclaimer: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const CreateDisclaimerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.CREATE_DISCLAIMER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.CREATE_DISCLAIMER_SUCCESS:
            return {
                loading: false,
                CreateDisclaimer: action.payload,
                error: '',
            };
        case Constants.CREATE_DISCLAIMER_FAILURE:
            return {
                loading: false,
                CreateDisclaimer: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const GetAllDisclaimerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.GET_ALLDISCLAIMER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.GET_ALLDISCLAIMER_SUCCESS:
            return {
                loading: false,
                GetAllDisclaimer: action.payload,
                error: '',
            };
        case Constants.GET_ALLDISCLAIMER_FAILURE:
            return {
                loading: false,
                GetAllDisclaimer: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default userReducer;
