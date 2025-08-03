import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarProvider,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
  SidebarFooter
} from "./components/ui/sidebar";
import { Bug, Code, Download, Home as HomeIcon, Settings } from "lucide-react";
import { cn } from "./lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./components/ui/breadcrumb";
import SettingsPage from "./pages/Settings";
import { Toaster } from "@/components/ui/sonner"
import NewDownload from "./pages/downloads/NewDownload";
import Downloads from "./pages/downloads/Downloads";

const SidebarNavigation = () => {
  const { pathname } = useLocation();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === "/"}>
          <Link to="/">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname.startsWith("/downloads")}>
          <Link to="/downloads">
            <Download />
            <span>Downloads</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === "/settings"}>
          <Link to="/settings">
            <Settings />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>ytdlx</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const breadcrumbs = pathSegments.map((crumb, index) => {
    const isLast = index === pathSegments.length - 1;
    const to = `/${pathSegments.slice(0, index + 1).join("/")}`;

    if (isLast) {
      return (
        <BreadcrumbItem key={crumb}>
          <BreadcrumbPage>{crumb}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    return (
      <React.Fragment key={crumb}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={to}>{crumb}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator key={`separator-${crumb}`} />
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">ytdlx</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator key="root-separator" />
        {breadcrumbs}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const SidebarFooterInner = () => {
  const { state } = useSidebar();

  return (
    <>
      <SidebarMenuButton asChild>
        <Link to="https://github.com/shie1/ytdlx/issues" target="_blank" rel="noopener noreferrer">
          <Bug />
          <span>Report Issue</span>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuButton asChild>
        <Link to="https://github.com/shie1/ytdlx" target="_blank" rel="noopener noreferrer">
          <Code />
          <span>Source Code</span>
        </Link>
      </SidebarMenuButton>
      <div className={cn("p-2 text-xs text-muted-foreground text-nowrap transition-all duration-300 overflow-hidden", state === "expanded" ? "max-h-8 opacity-100" : "max-h-0 opacity-0")}>
        ytdlx v1.0.0
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarNavigation />
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
          <SidebarFooter>
            <SidebarFooterInner />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <div className="flex flex-row w-full p-4">
            <Breadcrumbs />
          </div>
          <div className="p-4 pt-0 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/downloads/new" element={<NewDownload />} />
            </Routes>
          </div>
        </SidebarInset>
        <Toaster position="bottom-center" richColors closeButton duration={2000} />
      </SidebarProvider>
    </Router>
  );
}

export default App;
