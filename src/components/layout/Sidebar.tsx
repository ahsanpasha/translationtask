"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { styled, useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import LogoutIcon from "@mui/icons-material/Logout";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import CallIcon from "@mui/icons-material/Call";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    minHeight: "100vh",
    overflowX: "hidden",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
    },
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(!authMobile(theme) && {
        marginLeft: `-${drawerWidth}px`,
    }),
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("md")]: {
        marginLeft: 0,
        padding: theme.spacing(2),
    }
}));

function authMobile(theme: any) {
    return false;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: "#ffffff",
    color: "#111827",
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "none",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    paddingLeft: "24px",
    paddingRight: "24px",
    minHeight: "64px",
}));

const themeMui = createTheme({
    typography: {
        fontFamily: '"Poppins", "Inter", sans-serif',
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#ffffff",
                    color: "#111827",
                    borderRight: "1px solid #e5e7eb",
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    margin: "4px 8px",
                    "&.Mui-selected": {
                        backgroundColor: "#f3f4f6",
                        color: "#0F6FFF",
                        "&:hover": {
                            backgroundColor: "#f3f4f6",
                        },
                        "& .MuiListItemIcon-root": {
                            color: "#0F6FFF",
                        },
                    },
                    "&:hover": {
                        backgroundColor: "#f9fafb",
                    },
                }
            }
        }
    }
});

interface SidebarProps {
    children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isMobile) {
            setOpen(false);
            setMobileOpen(false);
        } else {
            setOpen(true);
        }
    }, [isMobile, pathname]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
        { text: "Chat", path: "/chat", icon: <ChatIcon /> },
        { text: "Video", path: "/video", icon: <VideoCameraBackIcon /> },
    ];

    const drawerContent = (
        <div className="flex flex-col h-full justify-between">
            <div>
                <DrawerHeader>
                    <div className="flex items-center">
                        <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
                            <CallIcon sx={{ color: "white", fontSize: 20 }} />
                        </div>
                    </div>
                    <IconButton onClick={isMobile ? handleDrawerToggle : handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <List sx={{ pt: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                    onClick={() => router.push(item.path)}
                                    selected={isActive}
                                >
                                    <ListItemIcon sx={{ color: isActive ? "#0F6FFF" : "#6b7280", minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 600 : 500 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </div>

            <div className="p-4 border-t border-gray-100">
                <ListItemButton sx={{ color: "#6b7280", m: 0 }}>
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </div>
        </div>
    );

    return (
        <ThemeProvider theme={themeMui}>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <AppBar position="fixed" open={!isMobile && open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={isMobile ? handleDrawerToggle : handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...((!isMobile && open) && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-semibold text-gray-900 leading-none">Ahsan</span>
                            </div>
                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#0F6FFF", fontSize: 14, fontWeight: 600 }}>A</Avatar>
                        </Box>
                    </Toolbar>
                </AppBar>

                {!isMobile && (
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                boxSizing: "border-box",
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        {drawerContent}
                    </Drawer>
                )}

                {isMobile && (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                )}

                <Main open={!isMobile && open}>
                    <DrawerHeader />
                    {children}
                </Main>
            </Box>
        </ThemeProvider>
    );
}
