import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "./context/authContext";
import RootLayout from "./layout/RootLayout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import HomePage from "./pages/HomePage";
import PublicOnlyRoute from "./layout/PublicOnlyRoute";
import ProtectedRoute from "./layout/ProtectedRoute";
import { Loader } from "lucide-react";

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } =
    useContext(authContext);
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="bg-black w-screen h-screen flex justify-center items-center">
        <Loader className="animate-spin mx-auto" color="white" />
      </div>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route element={<PublicOnlyRoute />}>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
