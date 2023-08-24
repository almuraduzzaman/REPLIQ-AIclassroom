import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import LandingPage from "../Pages/Home/LandingPage/LandingPage";
import Classes from "../Pages/Classes/Classes";
import ErrorPage from "../Shared/ErrorPage";
import ClassDetails from "../Pages/Classes/ClassDetails";
import AddAClass from "../Pages/Dashboard/AllCourses/AddAClass";
import Services from "../Pages/Services/Services";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddAUser from "../Pages/Dashboard/AllUsers/AddAUser";
import AllCourses from "../Pages/Dashboard/AllCourses/AllCourses";
import AdminRoute from "./AdminRoute";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import SelectedClasses from "../Pages/Dashboard/SelectedClasses/SelectedClasses";
import ComingSoon from "../Shared/ComingSoon";
import OrderList from "../Pages/Dashboard/OrderList/OrderList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signUp',
        element: <SignUp />
      },
      {
        path: 'classes',
        element: <Classes />
      },
      {
        path: 'classes/:id',
        element: <ClassDetails />,
        loader: ({ params }) => fetch(`https://repliq-server-phi.vercel.app/courses/${params.id}`)
      },
      {
        path: 'add-class',
        element: <AddAClass />
      },
      {
        path: 'services',
        element: <Services />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
    children: [
      {
        path: 'admin-home',
        element: <AdminRoute><AdminHome /></AdminRoute>
      },
      {
        path: 'manage-users',
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: 'manage-users/add-user',
        element: <AdminRoute><AddAUser /></AdminRoute>
      },
      {
        path: 'manage-classes',
        element: <AdminRoute><AllCourses /></AdminRoute>
      },
      {
        path: 'manage-classes/add-class',
        element: <AdminRoute><AddAClass /></AdminRoute>
      },
      {
        path: 'order-list',
        element: <AdminRoute><OrderList /></AdminRoute>
      },
      {
        path: 'user-home',
        element: <UserHome></UserHome>
      },
      {
        path: 'selected-classes',
        element: <SelectedClasses />
      },
      {
        path: 'enrolled-classes',
        element: <ComingSoon />
      },
      {
        path: 'payment-history',
        element: <ComingSoon />
      },
    ]
  }
]);

export default router;