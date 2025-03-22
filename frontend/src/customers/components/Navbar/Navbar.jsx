import React from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../State/Authentication/Action";
import { grey } from "@mui/material/colors";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToProfile = () => {
    auth.user?.role === "ROLE_ADMIN" || auth.user?.role === "ROLE_RESTAURANT_OWNER"
      ? navigate("/admin/restaurant")
      : navigate("/my-profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    handleCloseMenu();
  };

  return (
    <div className="px-5 z-50 py-[.8rem] bg-gradient-to-b from-black to-gray-700 lg:px-20 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <div onClick={() => navigate("/")} className="cursor-pointer flex items-center">
        <h1 
          className="text-4xl tracking-wide"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          <span style={{ color: "#FF914D" }}>Go</span>
          <span style={{ color: "#FFFFFF" }}>Eats</span>
        </h1>
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center space-x-2 lg:space-x-10">
        <IconButton onClick={() => navigate("/search")}>
          <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
        </IconButton>

        <div className="flex items-center space-x-2">
          {auth.user?.fullName ? (
            <span
              onClick={auth.user?.role === "ROLE_ADMIN" ? handleOpenMenu : navigateToProfile}
              className="font-semibold cursor-pointer"
            >
              <Avatar sx={{ bgcolor: "white", color: grey.A700 }} className="bg-white">
                {auth.user.fullName[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2rem", color: "white" }} />
            </IconButton>
          )}
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            <MenuItem onClick={() => navigate(auth.user?.role === "ROLE_ADMIN" ? "/admin" : "/super-admin")}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

        <IconButton onClick={navigateToCart}>
          <Badge color="black" badgeContent={cart.cartItems.length}>
            <ShoppingCartIcon sx={{ fontSize: "2rem", color: "white" }} />
          </Badge>
        </IconButton>
      </div>

      <Auth handleClose={() => navigate("/")} />
    </div>
  );
};

export default Navbar;
