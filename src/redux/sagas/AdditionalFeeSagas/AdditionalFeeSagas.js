import { call, put, takeEvery,all,takeLatest,fork } from 'redux-saga/effects';
import Constants from '../../constants/AuthConstant';
import JwtAuthService from '../../../services/JwtAuthService';
import { notification } from 'antd';
import { setCookie } from '../../../utils/AllCookies';
import AdditionalFeeAction from '../../actions/AuthAction/AdditionalFeeAction';
import Swal from 'sweetalert2'
import { type } from '@testing-library/user-event/dist/type';
import { act } from 'react';

function* additionalFeeSaga(action) {
    try {
        const response = yield call(JwtAuthService.getAPI, "","user/GetAllStatesAndCommunities");
        debugger;
        yield put(AdditionalFeeAction.AdditionalFeeSuccess(response));
    } catch (error) {
        yield put(AdditionalFeeAction.AdditionalFeeFailure(error.message));
    }
}

function* additionalFee() {
    yield takeLatest(Constants.ADDITIONALFEE_REQUEST, additionalFeeSaga);
}
function* GetAdditionalFeeSaga(action) {
  debugger;
    try {
        const response = yield call(JwtAuthService.getAPI, "",`user/GetAdditionalFee?id=${action?.payload?.id}`);
        debugger;
        yield put(AdditionalFeeAction.GetAdditionalFeeSuccess(response));
    } catch (error) {
        yield put(AdditionalFeeAction.GetAdditionalFeeFailure(error.message));
    }
}

function* GetAdditionalFee() {
    yield takeLatest(Constants.GET_ADDITIONALFEE_REQUEST, GetAdditionalFeeSaga);
}
function* GetAllAdditionalFeeSaga(action) {
  debugger;
    try {
        const response = yield call(JwtAuthService.getAPI, "",`user/GetAllAdditionalFee`);
        debugger;
        yield put(AdditionalFeeAction.GetAllAdditionalFeeSuccess(response));
    } catch (error) {
        yield put(AdditionalFeeAction.GetAllAdditionalFeeFailure(error.message));
    }
}

function* GetAllAdditionalFee() {
    yield takeLatest(Constants.GET_ALLADDITIONALFEE_REQUEST, GetAllAdditionalFeeSaga);
}


function* CreateAdditionalFeeSaga(action) {
  debugger;
    try {
        const response = yield call(JwtAuthService.postApi, action?.payload?.request,`user/AddAdditionalFee?propertyId=${action.payload.propertyId}&fee=${action.payload.fee}`);
       debugger;
          if (response) {
            yield put(AdditionalFeeAction.CreateAdditionalFeeSuccess(response));
            Swal.fire({
                text: "Additional Fee Added Successfully.",
                icon: "success",
                confirmButtonColor: "#5A7890",
                customClass: {
                  title: "text-success", 
                  content: "text-success", 
                }
              });
        }
        else{
            Swal.fire({
                text: "Additional Fee could not be added.",
                icon: "error",
                confirmButtonColor: "#5A7890",
                customClass: {
                  title: "text-danger", 
                  content: "text-danger", 
                },
              });
        }
       
    } catch (error) {
        Swal.fire({
            text: "Additional Fee could not be added.",
            icon: "error",
            confirmButtonColor: "#5A7890",
            customClass: {
              title: "text-danger", 
              content: "text-danger", 
            },
          });
        yield put(AdditionalFeeAction.CreateAdditionalFeeFailure(error.message));
    }
}

function* CreateAdditionalFee() {
    yield takeLatest(Constants.CREATE_ADDITIONALFEE_REQUEST, CreateAdditionalFeeSaga);
}

export default function* RootSaga() {
	yield all([
        fork(additionalFee),
        fork(CreateAdditionalFee),
        fork(GetAdditionalFee),
        fork(GetAllAdditionalFee)
	]);
}
