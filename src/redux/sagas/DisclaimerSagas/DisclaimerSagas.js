import { call, put, takeEvery,all,takeLatest,fork } from 'redux-saga/effects';
import Constants from '../../constants/AuthConstant';
import JwtAuthService from '../../../services/JwtAuthService';
import { notification } from 'antd';
import { setCookie } from '../../../utils/AllCookies';
import DisclaimerAction from '../../actions/AuthAction/DisclaimerAction';
import Swal from 'sweetalert2'
import { type } from '@testing-library/user-event/dist/type';

function* disclaimerSaga(action) {
    try {
        const response = yield call(JwtAuthService.getAPI, "","user/GetAllStatesAndCommunities");
        yield put(DisclaimerAction.DisclaimerSuccess(response));
    } catch (error) {
        yield put(DisclaimerAction.DisclaimerFailure(error.message));
    }
}

function* disclaimer() {
    yield takeLatest(Constants.DISCLAIMER_REQUEST, disclaimerSaga);
}
function* GetAllDisclaimerSaga(action) {
  debugger;
    try {
        const response = yield call(JwtAuthService.getAPI, "","user/GetAllDisclaimers");
        yield put(DisclaimerAction.GetAllDisclaimerSuccess(response));
    } catch (error) {
        yield put(DisclaimerAction.GetAllDisclaimerFailure(error.message));
    }
}

function* GetAllDisclaimer() {
    yield takeLatest(Constants.GET_ALLDISCLAIMER_REQUEST, GetAllDisclaimerSaga);
}


function* CreateDisclaimerSaga(action) {
  debugger;
    try {
        const response = yield call(JwtAuthService.postApi, action?.payload?.request,`user/AddDisclaimer?type=${action.payload.type}&id=${action.payload.id}&disclaimer=${action.payload.disclaimer}`);
       debugger;
          if (response) {
            yield put(DisclaimerAction.CreateDisclaimerSuccess(response));
            Swal.fire({
                text: "Disclaimer Added Successfully.",
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
                text: "Disclaimer could not be added.",
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
            text: "Disclaimer could not be added.",
            icon: "error",
            confirmButtonColor: "#5A7890",
            customClass: {
              title: "text-danger", // Custom class for the title text
              content: "text-danger", // Custom class for the content text
            },
          });
        yield put(DisclaimerAction.CreateDisclaimerFailure(error.message));
    }
}

function* CreateDisclaimer() {
    yield takeLatest(Constants.CREATE_DISCLAIMER_REQUEST, CreateDisclaimerSaga);
}

export default function* RootSaga() {
	yield all([
        fork(disclaimer),
        fork(CreateDisclaimer),
        fork(GetAllDisclaimer)
	]);
}
