import React, { useState, useEffect } from "react";
import {
  FiBox,
  FiUsers,
  FiTag,
  FiGift,
  FiMessageCircle,
  FiSettings,
  FiBarChart2,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  IoChevronForward,
  IoColorPaletteOutline,
  IoDiamondOutline,
  IoDocumentAttachOutline,
  IoFileTrayStackedOutline,
} from "react-icons/io5";
import { HiOutlineShoppingBag, HiOutlineShoppingCart } from "react-icons/hi";
import {
  LuLayoutDashboard,
  LuPanelsRightBottom,
  LuUsersRound,
} from "react-icons/lu";
import { CiDiscount1 } from "react-icons/ci";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiLockKeyOpen, PiShieldChevron } from "react-icons/pi";
import { GiBigDiamondRing } from "react-icons/gi";
import { TfiLink } from "react-icons/tfi";
import { BsBarChartLine, BsBox } from "react-icons/bs";
import { MdCurrencyExchange } from "react-icons/md";
import { LiaBoxesSolid, LiaGiftSolid, LiaShippingFastSolid } from "react-icons/lia";

const menuItems = [
  {
    icon: <LuLayoutDashboard />,
    label: "Dashboard",
    link: "/admin/dashboard",
    permission: "dashboard",
    badge: "3",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <LuPanelsRightBottom />,
    label: "Master Panel",
    permission: "master-panel",
    gradient: "from-purple-500 to-pink-500",
    subItems: [
      {
        icon: (
          <svg
            viewBox="0 0 64 64"
            className="size-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M60.784 52.617c.005-.003-3.733-8.7-3.734-8.712A3.139 3.139 0 0054.162 42H46.65a3.118 3.118 0 00-.018-2.395l-4.59-10.709a3.138 3.138 0 00-2.887-1.904H24.845a3.138 3.138 0 00-2.887 1.904l-4.59 10.71A3.118 3.118 0 0017.35 42H9.837a3.137 3.137 0 00-2.888 1.905L2.36 54.613a3.162 3.162 0 002.889 4.38h23.487a3.141 3.141 0 002.888-4.38l-4.555-10.629h9.864l-4.555 10.63a3.141 3.141 0 002.887 4.378h23.488a3.162 3.162 0 002.887-4.379z" />
          </svg>
        ),
        label: "Material Type",
        link: "/admin/master-panel/material-type",
        permission: "material-type",
      },
      {
        icon: <GiBigDiamondRing />,
        label: "Jewellery Type",
        link: "/admin/master-panel/jewellery-type",
        permission: "jewellery-type",
      },
      {
        icon: <TfiLink />,
        label: "Metal Master",
        link: "/admin/master-panel/metal-master",
        permission: "metal-master",
      },
      {
        icon: <IoColorPaletteOutline />,
        label: "Material Color",
        link: "/admin/master-panel/material-color",
        permission: "material-color",
      },
      {
        icon: <IoDiamondOutline />,
        label: "Gemstone Master",
        link: "/admin/master-panel/gemstone-master",
        permission: "gemstone-master",
      },
    ],
  },
  {
    icon: <HiOutlineShoppingBag />,
    label: "Products",
    permission: "products",
    badge: "12",
    gradient: "from-emerald-500 to-teal-500",
    subItems: [
      {
        icon: <HiOutlineShoppingBag />,
        label: "All Products",
        link: "/admin/product/all-products",
        permission: "all-products",
      },
      {
        icon: (
          <svg
            viewBox="0 0 24 24"
            stroke="2"
            className="size-3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 6h5a1 1 0 000-2H7a1 1 0 000 2z" />
          </svg>
        ),
        label: "Draft Products",
        link: "/admin/product/draft-products",
        permission: "draft-products",
      },
      {
        icon: <IoMdInformationCircleOutline />,
        label: "Low & Out of Stock",
        link: "/admin/product/low-and-out-of-stock-products",
        permission: "low-stock-products",
      },
    ],
  },
  {
    icon: <HiOutlineShoppingCart />,
    label: "Orders",
    link: "/admin/orders",
    permission: "orders",
    badge: "24",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: <FiUsers />,
    label: "Manage Customer",
    link: "/admin/manage-customer",
    permission: "manage-customer",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: <FiTag />,
    label: "Coupons",
    link: "/admin/coupon",
    permission: "coupon",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: <FiMessageCircle />,
    label: "Reviews & Ratings",
    link: "/admin/reviews-and-ratings",
    permission: "reviews-and-ratings",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="size-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="M44 26a3 3 0 00-3-3v-6a17 17 0 00-34 0v6a3 3 0 00-3 3 4 4 0 000 8 3 3 0 003 3h4a1 1 0 001-1V24a1 1 0 00-1-1H9v-6a15 15 0 0130 0v6h-2a1 1 0 00-1 1v12a1 1 0 001 1h2v2a5 5 0 01-5 5h-5.18A3 3 0 0026 42h-4a3 3 0 000 6h4a3 3 0 002.82-2H34a7 7 0 007-7v-2a3 3 0 003-3 4 4 0 000-8z" />
      </svg>
    ),
    label: "Support",
    link: "/admin/support",
    permission: "support",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    icon: (
      <svg
        viewBox="0 0 16 16"
        className="size-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 6.77c.226 0 .447.018.663.054l.019.08a2 2 0 002.508 1.45c.279.358.502.765.656 1.206a2 2 0 000 2.88 4.265 4.265 0 01-.656 1.207 2 2 0 00-2.508 1.45l-.02.079a3.98 3.98 0 01-1.325 0l-.019-.08a2 2 0 00-2.508-1.45 4.267 4.267 0 01-.656-1.206 2 2 0 000-2.88c.154-.44.377-.848.656-1.207a2 2 0 002.508-1.45l.02-.079c.215-.036.436-.055.662-.055z"
          fill="currentColor"
        />
      </svg>
    ),
    label: "CMS",
    permission: "cms",
    gradient: "from-violet-500 to-purple-500",
    subItems: [
      {
        icon: (
          <svg
            viewBox="0 0 128 128"
            className="size-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112 36.875a1 1 0 001-1v-2.437a3.426 3.426 0 00-1.8-3 5.188 5.188 0 10-7.4 0 3.426 3.426 0 00-1.8 3v1.438H31a1 1 0 000 2h71v57.687a3.426 3.426 0 001.8 3 5.188 5.188 0 107.4 0 3.426 3.426 0 001.8-3z" />
          </svg>
        ),
        label: "Banners",
        link: "/admin/cms/banners",
        permission: "banners",
      },
      {
        icon: <IoDocumentAttachOutline className="size-4" />,
        label: "Important Links",
        link: "/admin/cms/important-links",
        permission: "important-links",
      },
      {
        icon: <MdCurrencyExchange className="size-4" />,
        label: "Currency",
        link: "/admin/cms/currency",
        permission: "currency",
      },
    ],
  },
  {
    icon: <PiShieldChevron />,
    label: "RBAC",
    permission: "rbac",
    gradient: "from-red-500 to-pink-500",
    subItems: [
      {
        icon: <PiShieldChevron />,
        label: "Roles",
        link: "/admin/rbac/roles",
        permission: "roles",
      },
      {
        icon: <PiLockKeyOpen />,
        label: "Permissions",
        link: "/admin/rbac/permissions",
        permission: "permissions",
      },
      {
        icon: <LuUsersRound />,
        label: "Staff",
        link: "/admin/rbac/staff",
        permission: "staff",
      },
    ],
  },
  {
    icon: <LiaGiftSolid />,
    label: "Gifts",
    link: "/admin/gifts",
    permission: "gifts",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <FiBarChart2 />,
    label: "Report & Analytics",
    link: "/admin/analytics",
    permission: "analytics",
    gradient: "from-slate-500 to-gray-500",
    subItems: [
      {
        icon: <BsBarChartLine />,
        label: "Sales Reports",
        link: "/admin/analytics/sales-reports",
        permission: "sales-reports",
      },
      {
        icon: <LiaBoxesSolid />,
        label: "Order Reports",
        link: "/admin/analytics/order-reports",
        permission: "order-reports",
      },
    ],
  },
];

const Sidebar = ({ sidebarCollapsed = false, toggleSidebar = () => {} }) => {
  const [currentPath, setCurrentPath] = useState("/admin/dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const getUserObject = () => {
    return null; // Mock user object
  };

  const user = getUserObject();

  const getPanelName = () => {
    if (!user?.role) return "Admin Panel";
    if (user.role === "admin") return "Admin Panel";
    if (user.role === "staff") return "Staff Panel";
    return `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel`;
  };

  const handleLinkClick = (link) => {
    setCurrentPath(link);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    const activeIndex = menuItems.findIndex(
      (item) =>
        item.subItems &&
        item.subItems.some((subItem) => currentPath === subItem.link)
    );
    if (activeIndex !== -1) {
      setOpenDropdown(activeIndex);
    }
  }, [currentPath]);

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  const isActive = (link, subItems) => {
    if (link && currentPath === link) return true;
    if (subItems) {
      return subItems.some((item) => currentPath === item.link);
    }
    return false;
  };

  const hasPermission = () => true;

  const filteredMenuItems = menuItems.filter(() => true);

  return (
    <div className="sticky top-0 h-screen">
      <div className="w-72 h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 shadow-2xl border-r border-gray-700/50 backdrop-blur-xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_40%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)]"></div>
        </div>

        {/* Header Section */}
        <div className="relative px-6 py-2 border-b border-gray-700/30 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <img
                  src="/admin/admin-logo.png"
                  alt="Admin Logo"
                  loading="lazy"
                  className="size-12 rounded-xl shadow-lg ring-2 ring-white/10 object-cover"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-gray-900 shadow-lg animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-xl text-white tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {getPanelName()}
              </h1>
              <p className="text-sm text-gray-400 mt-1 flex items-center space-x-2">
                <span>Admin Dashboard</span>
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs">Online</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="relative px-4 py-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-transparent hover:scrollbar-thumb-gray-500/70">
          <nav className="space-y-1">
            {filteredMenuItems.map((item, index) => {
              const filteredSubItems = item.subItems
                ? item.subItems.filter(() => hasPermission())
                : null;

              const itemIsActive = isActive(item.link, filteredSubItems);
              const itemGradient = item.gradient || "from-gray-500 to-gray-600";

              return (
                <div key={index} className="group">
                  {filteredSubItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`relative flex items-center justify-between w-full px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${
                          itemIsActive
                            ? "bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm"
                            : "text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-1 hover:ring-white/10"
                        }`}
                      >
                        {/* Animated background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${itemGradient} opacity-0 transition-opacity duration-300 ${
                          hoveredItem === index || itemIsActive ? "opacity-20" : ""
                        }`}></div>
                        
                        <div className="relative flex items-center space-x-3">
                          <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                            itemIsActive
                              ? `bg-gradient-to-r ${itemGradient} text-white shadow-lg`
                              : "bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white"
                          }`}>
                            {item.icon}
                            {itemIsActive && (
                              <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                            )}
                          </div>
                          <span className="truncate font-medium">{item.label}</span>
                          {item.badge && (
                            <div className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${itemGradient} text-white shadow-lg animate-pulse`}>
                              {item.badge}
                            </div>
                          )}
                        </div>
                        <div className={`relative transition-all duration-300 ${
                          openDropdown === index ? "rotate-180" : "rotate-0"
                        }`}>
                          <span className="text-lg">
                            {openDropdown === index ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            )}
                          </span>
                        </div>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                          openDropdown === index 
                            ? "max-h-96 opacity-100 mt-3" 
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="ml-6 space-y-2 relative">
                          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-500 to-transparent"></div>
                          {filteredSubItems.map((subItem, subIndex) => (
                            <button
                              key={subIndex}
                              onClick={() => handleLinkClick(subItem.link)}
                              className={`relative flex items-center w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:translate-x-2 group ${
                                currentPath === subItem.link
                                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg ring-1 ring-blue-400/30 backdrop-blur-sm"
                                  : "text-gray-400 hover:bg-white/5 hover:text-white hover:shadow-md"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`relative p-1.5 rounded-lg transition-all duration-300 ${
                                  currentPath === subItem.link
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                    : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-white"
                                }`}>
                                  {subItem.icon}
                                  {currentPath === subItem.link && (
                                    <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse"></div>
                                  )}
                                </div>
                                <span className="truncate">
                                  {subItem.label}
                                </span>
                              </div>
                              {currentPath === subItem.link && (
                                <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => handleLinkClick(item.link)}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden group ${
                        currentPath === item.link
                          ? "bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm"
                          : "text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-1 hover:ring-white/10"
                      }`}
                    >
                      {/* Animated background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${itemGradient} opacity-0 transition-opacity duration-300 ${
                        hoveredItem === index || currentPath === item.link ? "opacity-20" : ""
                      }`}></div>
                      
                      <div className="relative flex items-center space-x-3">
                        <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                          currentPath === item.link
                            ? `bg-gradient-to-r ${itemGradient} text-white shadow-lg`
                            : "bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white"
                        }`}>
                          {item.icon}
                          {currentPath === item.link && (
                            <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                          )}
                        </div>
                        <span className="truncate font-medium">{item.label}</span>
                        {item.badge && (
                          <div className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${itemGradient} text-white shadow-lg animate-pulse`}>
                            {item.badge}
                          </div>
                        )}
                      </div>
                      <span className={`relative text-lg transition-all duration-300 group-hover:translate-x-1 ${
                        currentPath === item.link ? "text-white/80" : "text-gray-500 group-hover:text-white"
                      }`}>
                        <IoChevronForward />
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </nav>




        </div>
      </div>
    </div>
  );
};

export default Sidebar;