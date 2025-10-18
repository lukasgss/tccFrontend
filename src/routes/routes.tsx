import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/Utils/ScrollToTop";
import { AuthProvider } from "../contexts/AuthContext";
import usePageTracking from "../hooks/usePageTracking";
import AdoptionListings from "../pages/Alerts/Adoption/AdoptionListings/AdoptionListings";
import IndividualAlert from "../pages/Alerts/Adoption/IndividualAlert/IndividualAlert";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

function PageTrackingWrapper() {
  usePageTracking();

  return null;
}

const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const RedefinePassword = lazy(() => import("../pages/RedefinePassword/RedefinePassword"));
const UserSettings = lazy(() => import("../pages/UserSettings/UserSettings"));
const CreateAdoptionAlert = lazy(() => import("../pages/Alerts/Adoption/CreateAdoptionAlert/CreateAdoptionAlert"));
const EditAdoptionAlert = lazy(() => import("../pages/Alerts/Adoption/EditAdoptionAlert/EditAdoptionAlert"));
const UserCreatedAlerts = lazy(() => import("../pages/UserCreatedAlerts/UserCreatedAlerts"));
const LostListings = lazy(() => import("../pages/Alerts/Lost/LostListings/LostListings"));
const FoundListings = lazy(() => import("../pages/Alerts/Found/FoundListings/FoundListings"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <GeoLocationProvider> */}
        <ScrollToTop>
          <PageTrackingWrapper />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/esqueci-senha" element={<ForgotPassword />} />
            <Route path="/redefinir-senha" element={<RedefinePassword />} />
            <Route path="/minha-conta" element={<UserSettings />} />
            <Route path="/meus-alertas" element={<UserCreatedAlerts />} />
            <Route path="/adocoes" element={<AdoptionListings />} />
            <Route path="/adocoes/novo" element={<CreateAdoptionAlert />} />
            <Route path="/adocoes/editar/:alertId" element={<EditAdoptionAlert />} />
            <Route path="/adocoes/:alertId" element={<IndividualAlert />} />
            <Route path="/perdidos" element={<LostListings />} />
            <Route path="/encontrados" element={<FoundListings />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ScrollToTop>
        {/* </GeoLocationProvider> */}
      </AuthProvider>
    </BrowserRouter>
  );
}
