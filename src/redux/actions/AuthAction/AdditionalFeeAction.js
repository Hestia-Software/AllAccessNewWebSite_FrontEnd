import Constants from '../../constants/AuthConstant';
class AdditionalFeeAction {
   

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



static AdditionalFeeRequest = (credentials) => ({
    type: Constants.ADDITIONALFEE_REQUEST,
    payload: credentials,
});

static AdditionalFeeSuccess = (user) => ({
    type: Constants.ADDITIONALFEE_SUCCESS,
    payload: user,
});

static AdditionalFeeFailure = (error) => ({
    type: Constants.ADDITIONALFEE_FAILURE,
    payload: error,
});


static CreateAdditionalFeeRequest = (credentials) => ({
    type: Constants.CREATE_ADDITIONALFEE_REQUEST,
    payload: credentials,
});

static CreateAdditionalFeeSuccess = (user) => ({
    type: Constants.CREATE_ADDITIONALFEE_SUCCESS,
    payload: user,
});

static CreateAdditionalFeeFailure = (error) => ({
    type: Constants.CREATE_ADDITIONALFEE_FAILURE,
    payload: error,
});


static GetAdditionalFeeRequest = (credentials) => ({
    type: Constants.GET_ADDITIONALFEE_REQUEST,
    payload: credentials,
});

static GetAdditionalFeeSuccess = (user) => ({
    type: Constants.GET_ADDITIONALFEE_SUCCESS,
    payload: user,
});

static GetAdditionalFeeFailure = (error) => ({
    type: Constants.GET_ADDITIONALFEE_FAILURE,
    payload: error,
});

static GetAllAdditionalFeeRequest = (credentials) => ({
    type: Constants.GET_ALLADDITIONALFEE_REQUEST,
    payload: credentials,
});

static GetAllAdditionalFeeSuccess = (user) => ({
    type: Constants.GET_ALLADDITIONALFEE_SUCCESS,
    payload: user,
});

static GetAllAdditionalFeeFailure = (error) => ({
    type: Constants.GET_ALLADDITIONALFEE_FAILURE,
    payload: error,
});
}

export default AdditionalFeeAction;