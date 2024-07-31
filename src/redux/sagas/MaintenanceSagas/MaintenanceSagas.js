import { call, put, takeEvery,all,takeLatest,fork } from 'redux-saga/effects';
import Constants from '../../constants/AuthConstant';
import JwtAuthService from '../../../services/JwtAuthService';
import { notification } from 'antd';
import { setCookie } from '../../../utils/AllCookies';
import MaintenanceAction from '../../actions/AuthAction/MaintenanceAction';
import Swal from 'sweetalert2'

function* maintenanceSaga(action) {
    try {
        const response = yield call(JwtAuthService.getAPI, "","user/GetAllStatesCitiesAndCommunities");
        yield put(MaintenanceAction.MaintennceSuccess(response));
    } catch (error) {
        yield put(MaintenanceAction.MaintennceFailure(error.message));
    }
}

function* maintenance() {
    yield takeLatest(Constants.MAINTENANCE_REQUEST, maintenanceSaga);
}


function* CreateMaintenanceSaga(action) {
    try {
        const response = yield call(JwtAuthService.postApi, action?.payload?.request,"user/maintenancerequestsendbeforelogin");
       debugger;
          if (response) {
            yield put(MaintenanceAction.CreateMaintennceSuccess(response));
            Swal.fire({
                text: "Form Submitted Successfully.",
                icon: "success",
                confirmButtonColor: "#5A7890",
                customClass: {
                  title: "text-success", // Custom class for the title text
                  content: "text-success", // Custom class for the content text
                }
              });
        }
        else{
            Swal.fire({
                text: "Submission unsuccessfull. Please try again or contact us.",
                icon: "error",
                confirmButtonColor: "#5A7890",
                customClass: {
                  title: "text-danger", // Custom class for the title text
                  content: "text-danger", // Custom class for the content text
                },
              });
        }
       
    } catch (error) {
        Swal.fire({
            text: "Submission unsuccessfull. Please try again or contact us.",
            icon: "error",
            confirmButtonColor: "#5A7890",
            customClass: {
              title: "text-danger", // Custom class for the title text
              content: "text-danger", // Custom class for the content text
            },
          });
        yield put(MaintenanceAction.CreateMaintennceFailure(error.message));
    }
}

function* Createmaintenance() {
    yield takeLatest(Constants.CREATE_MAINTENANCE_REQUEST, CreateMaintenanceSaga);
}

export default function* rootSaga() {
	yield all([
        fork(maintenance),
        fork(Createmaintenance)
	]);
}
