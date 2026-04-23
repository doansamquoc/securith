import { useRoutes } from "react-router-dom";

// Layouts
import RootLayout from "./layouts/root.layout";
import AuthLayout from "./layouts/auth.layout";
import AuthenticatedLayout from "./layouts/authenticated.layout";

// Pages
import LandingPage from "./pages/landing/landing.page";
import LoginPage from "./pages/auth/login.page";
import DashboardPage from "./pages/authenticated/dashboard.page";
import CreatePollPage from "./pages/authenticated/create-poll.page";
import PollDetailPage from "./pages/authenticated/poll-detail.page";
import AnalyticsPage from "./pages/authenticated/analytics.page";

export const routes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <AuthenticatedLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "create",
            element: <CreatePollPage />,
          },
          {
            path: "polls/:pollId",
            element: <PollDetailPage />,
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,
          },
        ],
      },
    ],
  },
];

export const AppRouter = () => {
  const element = useRoutes(routes);
  return element;
};
