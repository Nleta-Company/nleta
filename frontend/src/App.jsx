import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Chatbot from './components/chatbot/Chatbot';
import ContactSection from './components/contactSection/ContactSection';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Industry from './pages/industry/Industry';
import Travelator from './pages/travelator/Travelator';
import LiftInspection from './pages/liftActsAndRules/LiftInspection';
import EscalatorInspection from './pages/escalatorInspection/EscalatorInspection';
import ProjectsTrainings from './pages/projectsTrainings/ProjectsTrainings';
import AssessmentDetail from './pages/assessmentDetail/AssessmentDetail';
import LiftActs from './pages/liftActsAndRules/LiftActs';
import LiftActsRules from './pages/liftActsAndRules/LiftActsRules';
import NewsAdmin from './pages/newsAdmin/NewsAdmin';
import ProjectsAdmin from './pages/projectsAdmin/ProjectsAdmin';
import Gallery from './pages/gallery/Gallery';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/travelator-inspection" element={<Travelator />} />
        <Route path="/assessments" element={<ProjectsTrainings />} />
        <Route path="/assessment-detail" element={<AssessmentDetail />} />
        <Route path="/lift-acts" element={<LiftActs />} />
        <Route path="/lift-acts-rules" element={<LiftActsRules />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news-admin" element={<NewsAdmin />} />
        <Route path="/projects-admin" element={<ProjectsAdmin />} />
        <Route path="/lift-inspection" element={<LiftInspection />} />
        <Route path="/escalator-inspection" element={<EscalatorInspection />} />
      </Routes>
      <ContactSection />
      <Footer />
      <Chatbot />
    </Router>
  );
}

export default App;
