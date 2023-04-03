import React, { Fragment, useEffect, useState } from "react";
import {
  // SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  // CurrencyRupeeOutlined,
  ColorLensOutlined as ThemeSettingsOutlinedIcon,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import SettingsDrawerButton from "./SettingsDrawerButton";

const profileImage =
  "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiPjwvZz48ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvZz48ZyBpZD0iU1ZHUmVwb19pY29uQ2FycmllciI+IDxwYXRoIGQ9Ik0xMi4xMiAxMi43OEMxMi4wNSAxMi43NyAxMS45NiAxMi43NyAxMS44OCAxMi43OEMxMC4xMiAxMi43MiA4LjcxOTk3IDExLjI4IDguNzE5OTcgOS41MDk5OEM4LjcxOTk3IDcuNjk5OTggMTAuMTggNi4yMjk5OCAxMiA2LjIyOTk4QzEzLjgxIDYuMjI5OTggMTUuMjggNy42OTk5OCAxNS4yOCA5LjUwOTk4QzE1LjI3IDExLjI4IDEzLjg4IDEyLjcyIDEyLjEyIDEyLjc4WiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+IDxwYXRoIGQ9Ik0xOC43NCAxOS4zODAxQzE2Ljk2IDIxLjAxMDEgMTQuNiAyMi4wMDAxIDEyIDIyLjAwMDFDOS40MDAwMSAyMi4wMDAxIDcuMDQwMDEgMjEuMDEwMSA1LjI2MDAxIDE5LjM4MDFDNS4zNjAwMSAxOC40NDAxIDUuOTYwMDEgMTcuNTIwMSA3LjAzMDAxIDE2LjgwMDFDOS43NzAwMSAxNC45ODAxIDE0LjI1IDE0Ljk4MDEgMTYuOTcgMTYuODAwMUMxOC4wNCAxNy41MjAxIDE4LjY0IDE4LjQ0MDEgMTguNzQgMTkuMzgwMVoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPiA8cGF0aCBkPSJNMTIgMjJDMTcuNTIyOCAyMiAyMiAxNy41MjI4IDIyIDEyQzIyIDYuNDc3MTUgMTcuNTIyOCAyIDEyIDJDNi40NzcxNSAyIDIgNi40NzcxNSAyIDEyQzIgMTcuNTIyOCA2LjQ3NzE1IDIyIDEyIDIyWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+IDwvZz48L3N2Zz4=";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Theme Settings",
    icon: <ThemeSettingsOutlinedIcon />,
    to: "/theme",
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

function Sidebar({
  user,
  drawerWidth,
  isNonMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const drawerContent = (
    <Fragment>
      <Box width="100%" overflow="auto" marginBottom="5rem">
        <Box m="1.5rem 2rem 2rem 3rem">
          <FlexBetween>
            <Box display="flex" alignItems="center" gap="0.5rem">
              <Typography
                variant="h3"
                fontWeight="bold"
                color={theme.palette.text.primary}
              >
                ViteDash
              </Typography>
            </Box>
            {!isNonMobile && (
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronLeft />
              </IconButton>
            )}
          </FlexBetween>
        </Box>
        <List>
          {navItems.map(({ text, icon, to }) => {
            if (!icon) {
              return (
                <Typography
                  key={text}
                  fontWeight="bold"
                  sx={{ m: "2.25rem 0 1rem 3rem" }}
                >
                  {text}
                </Typography>
              );
            }
            const lcText = text.toLowerCase();
            const lcTo = to || lcText;
            const isActive = active === lcTo?.substring(1) || active === lcText;
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`${lcTo}`);
                    setActive(lcText);
                  }}
                  selected={isActive}
                >
                  <ListItemIcon sx={{ ml: "2rem" }}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                  {isActive && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User Profile */}
      <Box width="100%" position="absolute" bottom="0" pb="1rem">
        <Divider />
        <FlexBetween textTransform="none" gap="1rem" m="1rem 2rem 0 2rem">
          <Box
            component="img"
            alt="profile"
            src={user?.profilePic || profileImage}
            height="40px"
            width="40px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />

          <Box textAlign="left">
            <Typography
              fontWeight="bold"
              fontSize="0.9rem"
              sx={{ color: theme.palette.text.primary }}
            >
              {user.name}
            </Typography>
            <Typography
              fontSize="0.8rem"
              sx={{ color: theme.palette.text.secondary }}
            >
              {user.occupation}
            </Typography>
          </Box>

          <SettingsDrawerButton />
        </FlexBetween>
      </Box>
    </Fragment>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {!isNonMobile && (
        <Drawer
          container={container}
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="temporary"
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              color: theme.palette.text.secondary,
              bgcolor: theme.palette.background.alt,
              borderWidth: isNonMobile ? 0 : "2px",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      {isNonMobile && (
        <Drawer
          variant="persistent"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              color: theme.palette.text.secondary,
              bgcolor: theme.palette.background.alt,
              borderWidth: isNonMobile ? 0 : "2px",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
