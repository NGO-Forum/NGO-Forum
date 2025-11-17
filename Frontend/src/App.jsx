import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// WHO WE ARE
import About from "./pages/About";
import History from "./pages/History";
import Structure from "./pages/Structure";
import Contact from "./pages/Contact";

// WHAT WE DO
import Program from "./pages/Program";
import Pali from "./pages/Pali";
import Sachas from "./pages/Sachas";
import Riti from "./pages/Riti";
import Macor from "./pages/Macor";

// RESOURCE HUB
import Latest from "./pages/Latest";
import Media from "./pages/Media";
import Library from "./pages/Library";

// GET INVOLVED
import Membership from "./pages/Membership";
import Volunteer from "./pages/Volunteer";
import Careers from "./pages/Careers";

// ADMIN PAGES
import AdminLayout from "./admins/AdminLayout";
import PeopleAdmin from "./admins/PeopleAdmin";
import AdminDashboard from "./admins/AdminDashboard";
import RequireAdmin from "./admins/middleware/RequireAdmin";
import AdminLogin from "./admins/page/AdminLogin";
import PostsAdmin from "./admins/PostAdmin";



export default function App() {
  const location = useLocation();
  // If URL starts with /admin → hide navbar & footer
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/program" element={<Program />} />
        <Route path="/pali" element={<Pali />} />
        <Route path="/sachas" element={<Sachas />} />
        <Route path="/riti" element={<Riti />} />
        <Route path="/macor" element={<Macor />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/media" element={<Media />} />
        <Route path="/library" element={<Library />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/careers" element={<Careers />} />

        {/* ADMIN ROUTES (NO NAVBAR/FOOTER) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="people" element={<PeopleAdmin />} />
          <Route path="posts" element={<PostsAdmin />} /> {/* Placeholder for PostsAdmin */}
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}
