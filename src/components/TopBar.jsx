import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  IconButton,
  Badge,
  Typography,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { FaBars } from "react-icons/fa";
import ConfirmDialog from "./ConfirmDialog";

const Topbar = ({ onMenuClick,bgcolor="bg-white" ,isForHomePage=false}) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileSettings = () => {
    handleCloseMenu();
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    handleCloseMenu();
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    setConfirmOpen(false);
    navigate("/auth/login");
  };

  return (
    <>
      <div
        className={`w-full ${bgcolor} h-16 px-4 md:px-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-30`}
      >
        {/* Left: Menu toggle for mobile */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-black" onClick={onMenuClick}>
            <FaBars size={20} />
          </button>
          {isForHomePage ? (
            <Typography
              fontWeight="bold"
              fontSize="18px"
              className="text-white"
            >
              Brahman Connect
            </Typography>
          ) : (
            <div>
              <Typography
                variant="subtitle1"
                className="!text-black font-semibold"
              >
                Hello, Kusha
              </Typography>
              <Typography variant="body2" className="!text-gray-400 text-sm">
                Have a nice day
              </Typography>
            </div>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          <IconButton>
            <Badge
              color="warning"
              variant="dot"
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: isForHomePage ? 'white' : 'black', // dot color
                },
              }}
              anchorOrigin={{vertical: "top", horizontal: "right"}}
            >
              <NotificationsIcon className={!isForHomePage ?"text-black":"text-white"} />
            </Badge>
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            className="!border-gray-300 h-6 hidden sm:block"
          />

          <Box
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Avatar
              src="assets/Image.png"
              alt="User"
              sx={{width: 32, height: 32}}
            />
            <Box className="hidden sm:block">
              <Typography
                variant="body2"
                className={`${!isForHomePage ?'!text-black':'text-white'} font-medium leading-tight`}
              >
                Kusha Reddy
              </Typography>
              <Typography variant="caption" className={!isForHomePage?"!text-gray-500":"text-white"}>
                Agent
              </Typography>
            </Box>
            <ExpandMoreIcon className={`${!isForHomePage? "text-black":"text-white"} text-sm`} />
          </Box>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            transformOrigin={{vertical: "top", horizontal: "right"}}
          >
            <MenuItem onClick={handleProfileSettings}>
              Profile Settings
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
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

export default Topbar;
