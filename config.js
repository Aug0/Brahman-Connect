
import { FaHome, FaCog, FaSignOutAlt, FaUsers,FaUserPlus } from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";

export const userType = {};
userType.SUPER_ADMIN_USER_TYPE_ID = "ADMIN";
userType.AGENT = "AGENT";
userType.POOJARI = "POOJARI";
userType.POOJA_STORE = "POOJA_STORE";
userType.CITIZEN = "CITIZEN";
userType.TEMPLE = "TEMPLE";

export const userEnum = {
SUPER_ADMIN_USER_TYPE_ID : "ADMIN",
POOJARI : "POOJARI",
AGENT : "AGENT",
POOJA_STORE : "POOJA_STORE",
CITIZEN : "CITIZEN",
TEMPLE :"TEMPLE"
};


const adminPagesList = [
  // { id: 1, name: "Dashboard", icon: FaHome, path: "/admin/dashboard" },
  { id: 3, name: "Agents",icon: MdRealEstateAgent, path: "/admin/agents" },
  { id: 2, name: "Add Agent", icon: FaUserPlus,path: "/admin/agent" },
  { id: 6, name: "Settings", icon: FaCog, path: "/settings" },
];

const poojariPagesList = [
  { id: 1, name: "Dashboard", icon: FaHome, path: "/poojari/dashboard" },
  { id: 2, name: "Create Agent", path: "/create-agent" },
  { id: 3, name: "Page Name", path: "/page2" },
  { id: 4, name: "Page Name", path: "/page3" },  
  { id: 6, name: "Settings", icon: FaCog, path: "/settings" },
];

const agentPagesList = [
  { id: 1, name: "Dashboard", icon: FaHome, path: "/agent/dashboard" },
  { id: 2, name: "Add Vendor", path: "/agent/vendor" },
  { id: 3, name: "Page Name", path: "/page2" },
  { id: 4, name: "Page Name", path: "/page3" },  
  { id: 6, name: "Settings", icon: FaCog, path: "/agent/settings" },
];

const poojaStorePagesList = [
  { id: 1, name: "Dashboard", icon: FaHome, path: "/pooja-store/dashboard" },
  // { id: 2, name: "Create Agent", path: "/create-agent" },
  // { id: 3, name: "Page Name", path: "/page2" },
  // { id: 4, name: "Page Name", path: "/page3" },  
  { id: 6, name: "Settings", icon: FaCog, path: "/settings" },
];

const citizenPagesList = [
  { id: 1, name: "Near By", icon: FaHome, path: "/citizen/near-by" },
  { id: 2, name: "Pooja", path: "/citizen/pooja" },
  { id: 3, name: "Page Name", path: "/page2" },
  { id: 4, name: "Page Name", path: "/page3" },  
  { id: 6, name: "Settings", icon: FaCog, path: "/settings" },
];

const templePagesList = [
  { id: 1, name: "Dashboard", icon: FaHome, path: "/vendor" },
  { id: 2, name: "Create Agent", path: "/create-agent" },
  { id: 3, name: "Page Name", path: "/page2" },
  { id: 4, name: "Page Name", path: "/page3" },  
  { id: 6, name: "Settings", icon: FaCog, path: "/settings" },
];

export const Nav = [
  {
    userRole: userType.SUPER_ADMIN_USER_TYPE_ID,
    pages: adminPagesList.map(page => ({
      name: page.name,
      id: page.name.replace(/\s+/g, '').toLowerCase(),
      link: page.path,
      Icon: page.icon || null,
      children: page.children || null,
    })),
    redirect: "/agents",
  },
   {
    userRole: userType.AGENT,
    pages: agentPagesList.map(page => ({
      name: page.name,
      id: page.name.replace(/\s+/g, '').toLowerCase(),
      link: page.path,
      Icon: page.icon || null,
      children: page.children || null,
    })),
    redirect: "/agent/dashboard",
  },
  {
    userRole: userType.CITIZEN,
    pages: citizenPagesList.map(page => ({
      name: page.name,
      id: page.name.replace(/\s+/g, '').toLowerCase(),
      link: page.path,
      Icon: page.icon || null,
      children: page.children || null,
    })),
    redirect: "/citizen",
  },
   {
    userRole: userType.POOJARI,
    pages: poojariPagesList.map(page => ({
      name: page.name,
      id: page.name.replace(/\s+/g, '').toLowerCase(),
      link: page.path,
      Icon: page.icon || null,
      children: page.children || null,
    })),
    redirect: "/poojari",
  },
  {
    userRole: userType.POOJA_STORE,
    pages: poojaStorePagesList.map(page => ({
      name: page.name,
      id: page.name.replace(/\s+/g, '').toLowerCase(),
      link: page.path,
      Icon: page.icon || null,
      children: page.children || null,
    })),
    redirect: "/pooja-store",
  },
  {
    userRole: userType.TEMPLE,
    pages: templePagesList.map(page => ({
      name: page.name,
      id: page.name.replace(/\s+/g, '').toLowerCase(),
      link: page.path,
      Icon: page.icon || null,
      children: page.children || null,
    })),
    redirect: "/temple",
  },
  
];

export const getSideBarItems = (userRole) => {
  return Nav.find((n) => n.userRole === userRole).pages;
};

export const getRedirectUrl = (userRole) => {
  return Nav ? Nav?.find((n) => n.userRole === userRole)?.redirect : "";
};
