import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

import GeneralView from "@/pages/GeneralView.vue";
import TheMost from "@/pages/TheMost.vue";
import RedBlackList from "@/pages/RedBlackList.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "generalView",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "Maps",
        component: Maps,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "table",
        name: "Table List",
        component: TableList,
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
      },
      {
        path: "upgradeToPro",
        name: "Upgrade to PRO",
        component: UpgradeToPRO,
      },
      {
        path: "generalView",
        name: "GeneralView",
        component: GeneralView,
      },
      {
        path: "theMost",
        name: "TheMost",
        component: TheMost,
      },
      {
        path: "redBlackList",
        name: "RedBlackList",
        component: RedBlackList,
      },
    ],
  },
];

export default routes;
