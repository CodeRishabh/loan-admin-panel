import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import questionMarkCircleFill from "@iconify/icons-eva/question-mark-circle-fill";
import tasksApp24Filled from "@iconify/icons-fluent/tasks-app-24-filled";
import searchOutline from "@iconify/icons-eva/search-outline";
import bxsCalculator from "@iconify/icons-bx/bxs-calculator";
import tasksIcon from "@iconify/icons-fa-solid/tasks";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
    {
        title: "dashboard",
        path: "/dashboard/app",
        icon: getIcon(pieChart2Fill),
    },
    {
        title: "user request",
        path: "/dashboard/user",
        icon: getIcon(peopleFill),
    },
    {
        title: "web user request",
        path: "/dashboard/webuser",
        icon: getIcon(peopleFill),
    },
    {
        title: "Customers query",
        path: "/dashboard/query",
        icon: getIcon(questionMarkCircleFill),
    },
    {
        title: "Customers review",
        path: "/dashboard/reviews",
        icon: getIcon(peopleFill),
    },
    {
        title: "EMI Calculator ",
        path: "/dashboard/emicalculator",
        icon: getIcon(bxsCalculator),
    },
    {
        title: "tasks",
        path: "/dashboard/tasks",
        icon: getIcon(tasksIcon),
    },
    {
        title: "rejected users",
        path: "/dashboard/rejectedusers",
        icon: getIcon(bxsCalculator),
    },
    {
        title: "admin details",
        path: "/dashboard/admindetails",
        icon: getIcon(peopleFill),
    },
];

export default sidebarConfig;
