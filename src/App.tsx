import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Guidelines from './pages/Guidelines';
import ReportScam from './pages/ReportScam';
import SuccessStories from './pages/SuccessStories';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import AddVendorModal from './components/AddVendorModal';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/report-scam" element={<ReportScam />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route 
              path="/add-business" 
              element={
                <>
                  <HomePage />
                  <AddVendorModal isOpen={true} onClose={() => window.history.back()} />
                </>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;