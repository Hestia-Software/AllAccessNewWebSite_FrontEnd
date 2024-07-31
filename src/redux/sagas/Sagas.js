import { all } from 'redux-saga/effects';
import Auth from './MaintenanceSagas/MaintenanceSagas';
import dis from './DisclaimerSagas/DisclaimerSagas';
import Fee from './AdditionalFeeSagas/AdditionalFeeSagas';
import Tenant from './TenantSagas/TenantSagas';

export default function* rootSaga(getState) {
  yield all([
    Auth(),
    dis(),
    Fee(),
    Tenant()
  ]);
}

