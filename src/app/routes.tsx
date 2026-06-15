import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { WelcomePage } from "./pages/WelcomePage";
import { AppLayout } from "./pages/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { CustomersPage } from "./pages/CustomersPage";
import { OverviewPage } from "./pages/OverviewPage";
import { LeadsPage } from "./pages/LeadsPage";
import { CampaignsPage } from "./pages/CampaignsPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", Component: LoginPage },
  { path: "/welcome", Component: WelcomePage },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", Component: DashboardPage },
      { path: "customers", Component: CustomersPage },
      { path: "overview", Component: OverviewPage },
      { path: "leads", Component: LeadsPage },
      { path: "campaigns", Component: CampaignsPage },
    ],
  },
]);
