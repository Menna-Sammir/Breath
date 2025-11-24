import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/homepage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import RequiredAuth from "./RequiredAuth";
import ProfilePage from "../../features/profiles/ProfilePage";
import VerifyEmail from "../../features/account/VerifyEmail";
import LoginPage from "../../features/account/LoginPage";
import RegisterPage from "../../features/account/RegisterPage";
import ChangePasswordPage from "../../features/account/ChangePasswordPage";
import ForgotPasswordPage from "../../features/account/ForgotPasswordPage";
import ResetPasswordPage from "../../features/account/ResetPasswordPage";
import AuthCallback from "../../features/account/AuthCallback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <RequiredAuth />,
        children: [
          {
            path: "activities",
            element: <ActivityDashboard />,
          },
          {
            path: "activities/:id",
            element: <ActivityDetailPage />,
          },
          {
            path: "manage/:id",
            element: <ActivityForm key="edit" />,
          },
          {
            path: "createActivity",
            element: <ActivityForm key="create" />,
          },
          {
            path: "change-password",
            element: <ChangePasswordPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "reset-password",
            element: <ResetPasswordPage />,
          },
          {
            path: "auth-callback",
            element: <AuthCallback />,
          },
          {
            path: "profiles/:id",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "errorTest",
        element: <TestErrors />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "confirm-email",
        element: <VerifyEmail />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
