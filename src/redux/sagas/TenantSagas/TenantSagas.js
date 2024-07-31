import { call, put, takeEvery,all,takeLatest,fork } from 'redux-saga/effects';
import Constants from '../../constants/AuthConstant';
import JwtAuthService from '../../../services/JwtAuthService';
import { notification } from 'antd';
import { setCookie } from '../../../utils/AllCookies';
import TenantAction from '../../actions/AuthAction/TenantAction';
import Swal from 'sweetalert2'

function* tenantSaga(action) {
    try {
        const response = yield call(JwtAuthService.getAPI, "","user/GetAllStatesCitiesAndCommunities");
        yield put(TenantAction.TenantSuccess(response));
    } catch (error) {
        yield put(TenantAction.TenantFailure(error.message));
    }
}

function* tenant() {
    yield takeLatest(Constants.TENANT_REQUEST, tenantSaga);
}


function* CreateTenantSaga(action) {
    try {
        const response = yield call(JwtAuthService.postApi, action?.payload?.request,"user/TenantRegistrationRequestBeforeLogin");
          if (response) {
            yield put(TenantAction.CreateTenantSuccess(response));
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
        yield put(TenantAction.CreateTenantFailure(error.message));
    }
}

function* CreateTenant() {
    yield takeLatest(Constants.CREATE_TENANT_REQUEST, CreateTenantSaga);
}

export default function* rootSaga() {
	yield all([
        fork(tenant),
        fork(CreateTenant)
	]);
}
