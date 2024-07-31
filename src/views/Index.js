import { lazy } from "react";
const PageNotFound = lazy(() => import("../views/CommonPages/NotFound"));
const Maintenance = lazy(()=> import("../views/auth-views/authentication/Maintenance"))
const Disclaimer = lazy(()=> import("../views/auth-views/authentication/Disclaimer"))
const AdditionalFee = lazy(()=> import("../views/auth-views/authentication/AdditionalFee"))
const TenantRegistration = lazy(()=> import("../views/auth-views/authentication/TenantRegistration"))
export const routes = [
  {
    path: "/nofound",
    component: PageNotFound,
    isPrivate: true,
    Title: "",
    Role: [
      "System Admin",
      "Unit User",
      "Board Member",
      "HOA Admin",
      "Community Admin",
    ],
  },
  {
    path: "/maintenance",
    component: Maintenance,
    isPrivate: false,
    Title: "",
    Role: [
      "System Admin",
      "Unit User",
      "Board Member",
      "HOA Admin",
      "Community Admin",
    ],
  },
  {
    path: "/disclaimer",
    component: Disclaimer,
    isPrivate: false,
    Title: "",
    Role: [
      "System Admin",
      "Unit User",
      "Board Member",
      "HOA Admin",
      "Community Admin",
    ],
  },
  {
    path: "/additional",
    component: AdditionalFee,
    isPrivate: false,
    Title: "",
    Role: [
      "System Admin",
      "Unit User",
      "Board Member",
      "HOA Admin",
      "Community Admin",
    ],
  },
  {
    path: "/tenant",
    component: AdditionalFee,
    isPrivate: false,
    Title: "",
    Role: [
      "System Admin",
      "Unit User",
      "Board Member",
      "HOA Admin",
      "Community Admin",
    ],
  },
];