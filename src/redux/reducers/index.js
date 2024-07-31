import { disclaimerReducer, CreateDisclaimerReducer, GetAllDisclaimerReducer } from './DisclaimerReducers/DisclaimerReducers';
import { additionalFeeReducer, CreateAdditionalFeeReducer, GetAdditionalFeeReducer, GetAllAdditionalFeeReducer } from './AdditionalFeeReducers/AdditionalFeeReducers';
import {maintenanceReducer,CreateMaintenanceReducer} from './MaintenanceReducers/MaintenanceReducers';
import {tenantReducer,CreateTenantReducer} from './TenantReducers/TenantReducers';
class Reducer{
    static Maintenance = maintenanceReducer;
    static CreateMaintenance = CreateMaintenanceReducer;
    static Tenant = tenantReducer;
    static CreateTenant = CreateTenantReducer;
    static Disclaimer = disclaimerReducer;
    static CreateDisclaimer = CreateDisclaimerReducer;
    static GetAllDisclaimer = GetAllDisclaimerReducer;
    static AdditionalFee = additionalFeeReducer;
    static CreateAdditionalFee = CreateAdditionalFeeReducer;
    static GetAdditionalFee = GetAdditionalFeeReducer;
    static GetAllAdditionalFee = GetAllAdditionalFeeReducer;
}

export default Reducer;
