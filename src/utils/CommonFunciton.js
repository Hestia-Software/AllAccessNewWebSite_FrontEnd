import Constants from "./Constants";
class CommonFunction {
  static HoaOptions = (userHoaId, roleName, hoaRolesDetails) => {
    switch (true) {
      case this.hasRole(roleName,"Community Admin"): {
        const hoaName = hoaRolesDetails?.filter(
          (data) => data?.value === userHoaId
        );
        return hoaName;
      }
      case this.hasRole(roleName,"HOA Admin"): {
        const hoaName = hoaRolesDetails?.filter(
          (data) => data?.value === userHoaId
        );
        return hoaName;
      }
      case this.hasRole(roleName,"System Admin"):
        return hoaRolesDetails;
      case this.hasRole(roleName,"Unit User"):
        const hoaName = hoaRolesDetails?.filter(
          (data) => data?.value === userHoaId
        );

        return hoaName;
      default:
        return hoaRolesDetails;
    }
  };
  static hasRole = (user, roleName)=> {
    return user?.roles?.some(role => role?.roleName === roleName);
  }
  static PermissionsList = (roleName, PermissionsListDetails) => {
    const filterList =
      PermissionsListDetails?.length > 0 &&
      PermissionsListDetails?.filter((data) => data?.name !== "System Admin");
    switch (true) {
      case this.hasRole(roleName,"System Admin"): {
        return PermissionsListDetails;
      }
      case this.hasRole(roleName,"Community Admin"): {
        const communityFilterList =
          PermissionsListDetails?.length > 0 &&
          PermissionsListDetails?.filter(
            (data) =>
              data?.name !== "System Admin" &&
              data?.name !== "HOA Admin" &&
              data?.name !== "Community Admin"
          );
        return communityFilterList;
      }

      case this.hasRole(roleName,"HOA Admin"): {
        const HoaFilterList =
          PermissionsListDetails?.length > 0 &&
          PermissionsListDetails?.filter(
            (data) =>
              data?.name !== "System Admin" && data?.name !== "Community Admin"
          );
        return HoaFilterList;
      }
      default:
        return filterList;
    }
  };

  static CommunityList = (communityList, selectCommunity) => {
    const filterList =
      communityList?.length > 0 &&
      communityList?.filter((data) => data?.value === selectCommunity[0]);
    if (filterList && filterList?.length > 0) {
      return filterList;
    } else {
      return communityList;
    }
  };
  //   static CommunityRolesList = (roleName, CommunityRolesList) => {
  //     debugger
  //     const filterList = CommunityRolesList?.length > 0 &&  CommunityRolesList?.filter(
  //         (data) => data?.name !== "Community Admin"
  //       );
  //     switch (roleName) {
  //       case "System Admin": {
  //         return PermissionsListDetails;
  //       }
  //       case "Community Admin":
  //           {

  //               return filterList;
  //           }

  //       case "Unit User":
  //         return filterList;
  //       default:
  //         return filterList;
  //     }
  //   };

  static ShowAdditionalField = (name, roles) => {
    let obj = {
      HoaShow: false,
      CommunityShow: false,
      UnitShow: false,
    };
    if (name === "roles") {
      obj = {
        //HoaShow: roles && roles === Constants.SystemAdminId?.toLowerCase(),
        CommunityShow:
          roles && roles === Constants.boardMemberId?.toLowerCase(),
        UnitShow: roles && roles === Constants.UnitId?.toLowerCase(),
      };
    }
    return obj;
  };
}
export default CommonFunction;
