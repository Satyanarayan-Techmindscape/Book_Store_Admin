import {
  Home,
  Box,
  DollarSign,
  Tag,
  Clipboard,
  Camera,
  AlignLeft,
  UserPlus,
  Users,
  Chrome,
  BarChart,
  Settings,
  Archive,
  Code,
  LogIn,
} from "react-feather";

export const MENUITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Banner",
    path: "/settings/banner",
    icon: Camera,
    type: "link",
  },

  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      { path: "/products/physical/header", title: "Header", type: "link" },
      { path: "/products/physical/category", title: "Category", type: "link" },
      {
        path: "/products/physical/sub-category",
        title: "Sub Category",
        type: "link",
      },
      {
        path: "/products/physical/add-product",
        title: "Add Product",
        type: "link",
      },
      {
        path: "/products/physical/product-list",
        title: "Product List",
        type: "link",
      },
      {
        path: "/products/physical/master_type_category",
        title: "Master Category",
        type: "link",
      },
      // {
      //   path: "/products/physical/shop-by-exam",
      //   title: "Shop By Exam",
      //   type: "link",
      // },
      // { path: '/products/physical/product-detail', title: 'Product Detail', type: 'link' },

      // { path: '/products/physical/availability', title: 'Delivery Zone', type: 'link' },

      // {
      //     title: 'digital', type: 'sub', active: false, children: [
      //         { path: '/products/digital/digital-category', title: 'Category', type: 'link' },
      //         { path: '/products/digital/digital-sub-category', title: 'Sub Category', type: 'link' },
      //         { path: '/products/digital/digital-product-list', title: 'Product List', type: 'link' },
      //         { path: '/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
      //     ]
      // },
    ],
  },
  {
    title: "Sales",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/sales/orders", title: "Orders", type: "link" },
      { path: "/sales/transactions", title: "Transactions", type: "link" },
      // { title: "Invoice", path: "/invoice", type: "link" },
    ],
  },
  {
    title: "Stock",
    path: "/stock/stock",
    icon: Code,
    type: "link",
  },
  {
    title: "Discount",
    icon: Tag,
    type: "sub",
    active: false,
    children: [
      {
        path: "/coupons/create-coupons",
        title: "Create Discount",
        type: "link",
      },
      { path: "/coupons/list-coupons", title: "List Discount", type: "link" },
    ],
  },
  {
    title: "CMS",
    icon: Chrome,
    type: "sub",
    active: false,
    children: [
      {
        path: "/cms/about-us",
        title: "About Us",
        type: "link",
      },
      {
        path: "/cms/faq",
        title: "FAQ",
        type: "link",
      },
      {
        path: "/cms/authors",
        title: "Author",
        type: "link",
      },
      { path: "/cms/terms-conditions", title: "Terms and Conditions", type: "link" },
      { path: "/settings/Logo", title: "Logo", type: "link" },
      { path: "/cms/Address", title: "Address", type: "link" },
    ],
  },
  // {
  //     title: 'Pages', icon: Clipboard , type: 'sub', active: false, children: [
  //         { path: '/pages/list-page', title: 'List Page', type: 'link' },
  //         { path: '/pages/create-page', title: 'Create Page', type: 'link' },
  //     ]
  // },
  // {
  //     title: 'Media', path: '/media', icon: Camera, type: 'link', active: false
  // },
  // {
  //     title: 'Menus', icon: AlignLeft, type: 'sub', active: false, children: [
  //         { path: '/menus/list-menu', title: 'List Menu', type: 'link' },
  //         { path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
  //     ]
  // },
  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "User List", type: "link" },
      // { path: '/users/create-user', title: 'Create User', type: 'link' },
    ],
  },
  // {
  //     title: 'Vendors', icon: Users, type: 'sub', active: false, children: [
  //         { path: '/vendors/list_vendors', title: 'Vendor List', type: 'link' },
  //         { path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
  //     ]
  // },
  // {
  //     title: 'Localization', icon: Chrome, type: 'sub', children: [
  //         { path: '/localization/transactions', title: 'Translations', type: 'link' },
  //         { path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
  //         { path: '/localization/taxes', title: 'Taxes', type: 'link' }
  //     ]
  // },
  {
    title: "Reports",
    path: "/reports/report",
    icon: BarChart,
    type: "link",
    active: false,
  },
  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    children: [
      { path: "/settings/profile", title: "Profile", type: "link" },
      { path: "/settings/size", title: "Size", type: "link" },
      { path: "/settings/tax", title: "Tax", type: "link" },
    
    ],
  },

  {
    title: "Logout",
    path: "/auth/login",
    icon: LogIn,
    type: "link",
    active: false,
  },
];
