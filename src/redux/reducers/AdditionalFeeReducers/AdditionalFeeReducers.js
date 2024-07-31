import Constants from '../../constants/AuthConstant';

const initialState = {
    loading: false,
    additionalFee: {},
    CreateAdditionalFee:{},
    GetAdditionalFee:{},
    GetAllAdditionalFee:{},
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
                additionalFee: action.payload,
                error: '',
            };
        case Constants.FETCH_USER_FAILURE:
            return {
                loading: false,
                additionalFee: {},
                error: action.payload,
            };
        default:
            return state;
    }
};
export const additionalFeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.ADDITIONALFEE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.ADDITIONALFEE_SUCCESS:
            return {
                loading: false,
                additionalFee: action.payload,
                error: '',
            };
        case Constants.ADDITIONALFEE_FAILURE:
            return {
                loading: false,
                additionalFee: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const CreateAdditionalFeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.CREATE_ADDITIONALFEE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.CREATE_ADDITIONALFEE_SUCCESS:
            return {
                loading: false,
                CreateAdditionalFee: action.payload,
                error: '',
            };
        case Constants.CREATE_ADDITIONALFEE_FAILURE:
            return {
                loading: false,
                CreateAdditionalFee: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const GetAdditionalFeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.GET_ADDITIONALFEE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.GET_ADDITIONALFEE_SUCCESS:
            return {
                loading: false,
                GetAdditionalFee: action.payload,
                error: '',
            };
        case Constants.GET_ADDITIONALFEE_FAILURE:
            return {
                loading: false,
                GetAdditionalFee: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const GetAllAdditionalFeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.GET_ALLADDITIONALFEE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.GET_ALLADDITIONALFEE_SUCCESS:
            return {
                loading: false,
                GetAllAdditionalFee: action.payload,
                error: '',
            };
        case Constants.GET_ALLADDITIONALFEE_FAILURE:
            return {
                loading: false,
                GetAllAdditionalFee: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default userReducer;
