import Constants from '../../constants/AuthConstant';
class MaintenanceAction {
   

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



static MaintennceRequest = (credentials) => ({
    type: Constants.MAINTENANCE_REQUEST,
    payload: credentials,
});

static MaintennceSuccess = (user) => ({
    type: Constants.MAINTENANCE_SUCCESS,
    payload: user,
});

static MaintennceFailure = (error) => ({
    type: Constants.MAINTENANCE_FAILURE,
    payload: error,
});


static CreateMaintennceRequest = (credentials) => ({
    type: Constants.CREATE_MAINTENANCE_REQUEST,
    payload: credentials,
});

static CreateMaintennceSuccess = (user) => ({
    type: Constants.CREATE_MAINTENANCE_SUCCESS,
    payload: user,
});

static CreateMaintennceFailure = (error) => ({
    type: Constants.CREATE_MAINTENANCE_FAILURE,
    payload: error,
});
}

export default MaintenanceAction;