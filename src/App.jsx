import { RouterProvider, createBrowserRouter, Outlet } from "react-router";

import RootLayout from "./layout/root-layout";
import AuthLayout from "./layout/auth-layout";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import NotFound from "./pages/not-found";
import ProtectedRoute from "./components/protected-route";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: <div>About Page</div>,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
            children: [
              {
                path: "*",
              },
            ],
          },
          {
            path: "register",
            element: <Register />,
            children: [
              {
                path: "*",
              },
            ],
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "security",
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;