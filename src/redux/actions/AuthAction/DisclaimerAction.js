import Constants from '../../constants/AuthConstant';
class DisclaimerAction {
   

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



static DisclaimerRequest = (credentials) => ({
    type: Constants.DISCLAIMER_REQUEST,
    payload: credentials,
});

static DisclaimerSuccess = (user) => ({
    type: Constants.DISCLAIMER_SUCCESS,
    payload: user,
});

static DisclaimerFailure = (error) => ({
    type: Constants.DISCLAIMER_FAILURE,
    payload: error,
});


static CreateDisclaimerRequest = (credentials) => ({
    type: Constants.CREATE_DISCLAIMER_REQUEST,
    payload: credentials,
});

static CreateDisclaimerSuccess = (user) => ({
    type: Constants.CREATE_DISCLAIMER_SUCCESS,
    payload: user,
});

static CreateDisclaimerFailure = (error) => ({
    type: Constants.CREATE_DISCLAIMER_FAILURE,
    payload: error,
});

static GetAllDisclaimerRequest = (credentials) => ({
    type: Constants.GET_ALLDISCLAIMER_REQUEST,
    payload: credentials,
});

static GetAllDisclaimerSuccess = (user) => ({
    type: Constants.GET_ALLDISCLAIMER_SUCCESS,
    payload: user,
});

static GetAllDisclaimerFailure = (error) => ({
    type: Constants.GET_ALLDISCLAIMER_FAILURE,
    payload: error,
});
}

export default DisclaimerAction;