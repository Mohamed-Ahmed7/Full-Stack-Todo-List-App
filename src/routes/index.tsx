import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import RootLayout from "../pages/Layout";
import HomePage from "../pages";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
let isLoggedIn = false;
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/login">
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);

export default routes;
