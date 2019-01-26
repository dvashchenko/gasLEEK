import Dashboard from "./views/Dashboard.jsx";
import Icons from "./views/Icons.jsx";
import Map from "./views/Map.jsx";
import Notifications from "./views/Notifications.jsx";
import TableList from "./views/TableList.jsx";
import Typography from "./views/Typography.jsx";
import UserProfile from "./views/UserProfile.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/gasLEEK"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/gasLEEK"
  },
  {
    path: "/map",
    name: "Map",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/gasLEEK"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/gasLEEK"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/gasLEEK"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/gasLEEK"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/gasLEEK"
  }
];
export default routes;
