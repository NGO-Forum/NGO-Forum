import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";
import Structure from "./pages/Structure";
import Contact from "./pages/Contact";
import Pali from "./pages/Pali";
import Sachas from "./pages/Sachas";
import Riti from "./pages/Riti";
import Macor from "./pages/Macor";
import Media from "./pages/Media";
import Library from "./pages/Library";
import Membership from "./pages/Membership";
import Volunteer from "./pages/Volunteer";
import Careers from "./pages/Careers";
import Lates from "./pages/Lates";

// Admin Pages
import AdminLayout from "./admins/AdminLayout";
import PeopleAdmin from "./admins/PeopleAdmin";
import AdminDashboard from "./admins/AdminDashboard";
import PostsAdmin from "./admins/PostAdmin";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/history", element: <History /> },
  { path: "/structure", element: <Structure /> },
  { path: "/contact", element: <Contact /> },
  { path: "/pali", element: <Pali /> },
  { path: "/sachas", element: <Sachas /> },
  { path: "/riti", element: <Riti /> },
  { path: "/macor", element: <Macor /> },
  { path: "/latest", element: <Lates /> },
  { path: "/media", element: <Media /> },
  { path: "/library", element: <Library /> },
  { path: "/membership", element: <Membership /> },
  { path: "/volunteer", element: <Volunteer /> },
  { path: "/careers", element: <Careers /> },
  
  // ADMIN ROUTES
  
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },      // default /admin
      { path: "people", element: <PeopleAdmin /> },
      { path: "posts", element: <PostsAdmin /> }, // Placeholder for PostsAdmin
    ],
  },
]);

export default router;
