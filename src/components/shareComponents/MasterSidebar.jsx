import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FaHome } from "react-icons/fa";

const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : 60, // Adjust width when closed
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundImage: "linear-gradient(20deg, #5c6bc0, #cfd8dc)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "#263238",
    width: open ? drawerWidth : 60, // Set width dynamically
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
}));

MasterSidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function MasterSidebar({ items }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <Drawer
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          {open ? (
            <div className="flex items-center justify-center">
              <div className="w-[50%]">
                <img src="/Logo.png" alt="Logo" className="w-fit h-fit" />
              </div>
              <IconButton onClick={() => setOpen(false)}>
                <ChevronLeftIcon sx={{ scale: 1.3 }} />
              </IconButton>
            </div>
          ) : (
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon sx={{ scale: 1.3 }} />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {items.map((i) => {
            const isActive = location.pathname === i.link;
            return (
              <ListItem key={i.name} disablePadding sx={{ my: 2 }}>
                <Link
                  to={i.link}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      px: open ? 2.5 : 1,
                      backgroundColor: isActive ? "#5c6bc0" : "transparent",
                      color: isActive ? "white" : "black",
                      "&:hover": { backgroundColor: "#5c6bc0", color: "#fff" },
                      display: "flex",
                      alignItems: "center",
                      gap: open ? 2 : 1,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                        backgroundColor: "#5c6bc0",
                        padding: 1.5,
                        borderRadius: "50%",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      {i.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={i.name}
                        primaryTypographyProps={{
                          sx: { fontSize: "1.1rem", fontWeight: "bold" },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <ListItem disablePadding sx={{ my: 2 }}>
          <Link to={"/"} style={{ textDecoration: "none", width: "100%" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: open ? 2.5 : 1,
                "&:hover": { backgroundColor: "#5c6bc0", color: "#fff" },
                display: "flex",
                alignItems: "center",
                gap: open ? 2 : 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  backgroundColor: "#5c6bc0",
                  padding: 1.5,
                  borderRadius: "50%",
                }}
              >
                <FaHome />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={"Home"}
                  primaryTypographyProps={{
                    sx: { fontSize: "1.1rem", fontWeight: "bold" },
                  }}
                />
              )}
            </ListItemButton>
          </Link>
        </ListItem>
      </Drawer>
    </Box>
  );
}
