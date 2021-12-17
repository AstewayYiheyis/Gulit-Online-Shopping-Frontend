import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "My Orders",
    path: "/dashboard/orders",
    icon: getIcon(shoppingBagFill),
  },
  {
    title: "product",
    path: "/dashboard/products",
    icon: getIcon(shoppingBagFill),
  },

  {
    title: "Product Registration",
    path: "/dashboard/product",
    icon: getIcon(fileTextFill),
  },

  {
    title: "Seller Management",
    path: "/dashboard/ApproveSeller",
    icon: getIcon(personAddFill),
  },
  {
    title: "Buyer Registration",
    path: "/buyer-register",
    icon: getIcon(personAddFill),
  },
  {
    title: "Seller Registration",
    path: "/seller-register",
    icon: getIcon(fileTextFill),
  },
  {
    title: "register-Admin",
    path: "/register",
    icon: getIcon(personAddFill),
  },
];
export default sidebarConfig;
