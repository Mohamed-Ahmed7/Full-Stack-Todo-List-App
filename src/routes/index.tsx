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
import ProfilePage from "../pages/Profile";
import ErrorHandler from "../components/errors/ErrorHandler";
import TodosPage from "../pages/Todos";
const userDataString = localStorage.getItem("loggedInUser");
const userData = userDataString ? JSON.parse(userDataString) : null;
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login">
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="todos"
          element={
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login">
              <TodosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/login">
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
