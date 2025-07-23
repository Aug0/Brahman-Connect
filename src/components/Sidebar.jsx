import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaCog, FaSignOutAlt } from "react-icons/fa";
import ConfirmDialog from "./ConfirmDialog";
import { getSideBarItems } from "../../config";
import { useSelector } from "react-redux";


const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
   const auth = useSelector((state) => state.auth);
  const [sideBarItems,setSideBarItems]=useState([])
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleLogout = () => {
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    setConfirmOpen(false);
    navigate("/");
  };
  

  useEffect(() => {
    setSideBarItems(getSideBarItems("ADMIN"));
    if (auth?.isLoggedIn) {
     setSideBarItems(getSideBarItems(auth?.userRole));
    }
  }, [auth?.isLoggedIn, auth?.userRole]);

  const toggleSubmenu = (id) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-56 bg-[#d75a2c] text-white p-4 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:h-screen md:flex md:flex-col md:justify-between`}
      >
        <div>
          <h2 className="text-lg font-semibold mb-6">Brahman Connect</h2>
          {/* <ul className="space-y-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `${!item.icon ?'ml-[17px]':''} flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm ${
                      isActive
                        ? "bg-yellow-400 text-black"
                        : "hover:bg-yellow-400 hover:text-black text-white"
                    }`
                  }
                >
                  {item.icon && item.icon} {item.name}
                </NavLink>
              </li>
            ))}
          </ul> */}
          <ul className="space-y-0">
          {sideBarItems.map((item) => (
            <li key={item.id}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.id)}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm text-white hover:bg-yellow-400 hover:text-black`}
                  >
                    {item.Icon && <item.Icon />}
                    <span>{item.name}</span>
                    <span className="ml-auto">{openSubmenus[item.id] ? "▾" : "▸"}</span>
                  </button>

                  {openSubmenus[item.id] && (
                    <ul className="ml-5 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <NavLink
                            to={child.link}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `block px-3 py-1.5 rounded-md text-sm font-medium ${
                                isActive && openSubmenus[item.id]===item.id
                                  ? "bg-yellow-400 text-black"
                                  : "hover:bg-yellow-400 hover:text-black text-white"
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.link}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `${!item.Icon ? "ml-[17px]" : ""} flex items-center gap-2 px-3 py-2 mb-1 rounded-md font-medium text-sm ${
                      isActive
                        ? "bg-yellow-400 text-black"
                        : "hover:bg-yellow-400 hover:text-black text-white"
                    }`
                  }
                >
                  {item.Icon && <item.Icon />}
                  <span>{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-yellow-300 mt-4"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Confirm Dialog */}
        <ConfirmDialog
        open={confirmOpen}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmLogout}
        cancelText="Cancel"
        confirmText="Logout"
        confirmColor="#d25b2d"
      />
    </>
  );
};

export default Sidebar;
