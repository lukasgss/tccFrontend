import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/Utils/ScrollToTop";
import { AuthProvider } from "../contexts/AuthContext";
import usePageTracking from "../hooks/usePageTracking";
import AdoptionListings from "../pages/Alerts/Adoption/AdoptionListings/AdoptionListings";
import IndividualAlert from "../pages/Alerts/Adoption/IndividualAlert/IndividualAlert";
import FoundAlertIndividualAlert from "../pages/Alerts/Found/IndividualAlert/IndividualAlert";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserProfile from "../pages/UserProfile/UserProfile";
import FoundListings from "../pages/Alerts/Found/FoundListings/FoundListings";
import MissingAnimalListings from "../pages/Alerts/Missing/Listing/MissingAnimalListing";
import IndividualMissingAlert from "../pages/Alerts/Missing/IndividualAlert/IndividualMissingAlert";

function PageTrackingWrapper() {
  usePageTracking();

  return null;
}

const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const RedefinePassword = lazy(() => import("../pages/RedefinePassword/RedefinePassword"));
const UserSettings = lazy(() => import("../pages/UserSettings/UserSettings"));
const CreateAdoptionAlert = lazy(() => import("../pages/Alerts/Adoption/CreateAdoptionAlert/CreateAdoptionAlert"));
const EditAdoptionAlert = lazy(() => import("../pages/Alerts/Adoption/EditAdoptionAlert/EditAdoptionAlert"));
const UserSavedAlerts = lazy(() => import("../pages/UserSavedAlerts/UserSavedAlerts"));
const UserCreatedAlerts = lazy(() => import("../pages/UserCreatedAlerts/UserCreatedAlerts"));
const HowToAdoptThroughPlatform = lazy(() => import("../pages/HowToAdoptThroughPlatform/HowToAdoptThroughPlatform"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const About = lazy(() => import("../pages/About/About"));
const GetInTouch = lazy(() => import("../pages/GetInTouch/GetInTouch"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const ResponsibleAdoption = lazy(() => import("../pages/ResponsibleAdoption/ResponsibleAdoption"));
const TermsOfUseAndPrivacyPolicy = lazy(() => import("../pages/TermsOfUseAndPrivacyPolicy/TermsOfUseAndPrivacyPolicy"));
const CreateFoundAnimalAlerts = lazy(() => import("../pages/Alerts/Found/CreateFoundAlert/CreateFoundAnimalAlert"));
const CreateMissingAlerts = lazy(() => import("../pages/Alerts/Missing/CreateMissingAlert/CreateMissingAlert"));

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
            <Route path="/perfil/:id" element={<UserProfile />} />
            <Route path="/alertas-salvos" element={<UserSavedAlerts />} />
            <Route path="/meus-alertas" element={<UserCreatedAlerts />} />
            <Route path="/adocoes" element={<AdoptionListings />} />
            <Route path="/adocoes/novo" element={<CreateAdoptionAlert />} />
            <Route path="/adocoes/editar/:alertId" element={<EditAdoptionAlert />} />
            <Route path="/adocoes/:alertId" element={<IndividualAlert />} />
            <Route path="/adocoes/como-adotar" element={<HowToAdoptThroughPlatform />} />
            <Route path="/perdidos" element={<MissingAnimalListings />} />
            <Route path="/perdidos/novo" element={<CreateMissingAlerts />} />
            <Route path="/perdidos/:alertId" element={<IndividualMissingAlert />} />
            <Route path="/encontrados" element={<FoundListings />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<GetInTouch />} />
            <Route path="/adocao-responsavel" element={<ResponsibleAdoption />} />
            <Route path="/termos-de-uso-e-politica-de-privacidade" element={<TermsOfUseAndPrivacyPolicy />} />
            <Route path="/encontrados/criar" element={<CreateFoundAnimalAlerts />} />
            <Route path="/encontrados/:alertId" element={<FoundAlertIndividualAlert />} />
            <Route path="/adocoes/:alertId" element={<IndividualAlert />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ScrollToTop>
        {/* </GeoLocationProvider> */}
      </AuthProvider>
    </BrowserRouter>
  );
}
