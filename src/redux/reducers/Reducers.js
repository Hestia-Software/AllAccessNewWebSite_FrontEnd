import { combineReducers } from 'redux';
import Reducer from './index';

const rootReducer = combineReducers({
    Maintenance:Reducer.Maintenance,
    CreateMaintenance : Reducer.CreateMaintenance,
    Tenant:Reducer.Tenant,
    CreateTenant : Reducer.CreateTenant,
    Disclaimer: Reducer.Disclaimer,
    CreateDisclaimer: Reducer.CreateDisclaimer,
    AdditionalFee: Reducer.AdditionalFee,
    CreateAdditionalFee: Reducer.CreateAdditionalFee,
    GetAdditionalFee: Reducer.GetAdditionalFee,
    GetAllAdditionalFee: Reducer.GetAllAdditionalFee,
    GetAllDisclaimer: Reducer.GetAllDisclaimer,
});

export default rootReducer;