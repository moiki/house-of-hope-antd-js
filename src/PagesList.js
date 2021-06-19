import ClinicsView from "views/clinics";
import ClinicDetails from "views/clinics/ClinicDetails.";
import ClinicManager from "views/clinics/ClinicManager";
import EmployeesManager from "views/clinics/EmployeesManager";
import Home from "views/home";
import ManagementView from "views/management";
import PacientsView from "views/pacients";
import PacientsManager from "views/pacients/PacientManager";
import PatientDetails from "views/pacients/PatientDetails";
import RoutesView from "views/workRoutes";
import RoutesCalendar from "views/workRoutes/RoutesCalendar";
import RoutesManager from "views/workRoutes/RoutesManager";
import Error404 from "./components/blocked/Error404";

const MainPagesList = [
  {
    title: "Home",
    path: "home",
    icon: "home",
    layout: "admin",
    component: Home,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
    show: false,
  },
  {
    title: "Work Routes",
    path: "",
    icon: "map",
    layout: "admin",
    component: Error404,
    show: true,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Review",
    path: "routes/review",
    icon: null,
    layout: "admin",
    component: RoutesView,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Routes Manager",
    path: "routes/manage",
    icon: "null",
    layout: "admin",
    component: RoutesManager,
    allowedRoles: ["Root", "Administrator"],
  },
  {
    title: "Pacients",
    path: "",
    icon: "local_hospital",
    layout: "admin",
    component: Error404,
    show: true,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Review",
    path: "pacients/review",
    icon: null,
    layout: "admin",
    component: PacientsView,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Pacients Manager",
    path: "pacients/manage",
    icon: "null",
    layout: "admin",
    component: PacientsManager,
    allowedRoles: ["Root", "Administrator", "Local Member"],
  },
  {
    title: "Clinics",
    path: "",
    icon: "location_city",
    layout: "admin",
    component: Error404,
    show: true,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Review",
    path: "clinics/review",
    icon: null,
    layout: "admin",
    component: ClinicsView,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Clinic Details",
    path: "clinics/details/:id",
    icon: null,
    layout: "admin",
    component: ClinicDetails,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Patient Details",
    path: "patients/details",
    icon: null,
    layout: "admin",
    component: PatientDetails,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Clinics Manager",
    path: "clinics/manage",
    icon: "null",
    layout: "admin",
    component: ClinicManager,
    allowedRoles: ["Root", "Administrator"],
  },
  {
    title: "Employees Manager",
    path: "clinics/employees",
    icon: "null",
    layout: "admin",
    component: EmployeesManager,
    allowedRoles: ["Root", "Administrator"],
  },
  {
    title: "Calendar",
    path: "routes/calendar",
    icon: "calendar_today",
    layout: "admin",
    component: RoutesCalendar,
    children: null,
    show: true,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Management",
    path: "management",
    icon: "settings_applications",
    layout: "admin",
    component: ManagementView,
    children: null,
    show: true,
    allowedRoles: ["Root"],
  },
  {
    title: "Create User",
    path: "create-user",
    icon: "settings_applications",
    layout: "admin",
    component: Error404,
    children: null,
    show: true,
    allowedRoles: ["Root"],
  },
];

export default MainPagesList;
