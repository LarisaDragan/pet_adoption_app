import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import AdoptAPet from './pages/AdoptAPet/index';
import LoginForm from './pages/SignInForm/index';
import RegisterForm from './pages/RegisterForm/index';
import PetProfile from './pages/PetProfile/index';
import RehomePet from './pages/RehomePet/RehomePet';
import AdoptionInformation from './pages/AdoptionInformation/index';
import PetCare from './pages/PetCare/index';
import { ToastContainer } from 'react-toastify';
import { getToken } from './helpers/getToken';

const App = () => {
  const token = getToken();

  return (
    <Router>
      {!token &&
        (location.pathname === '/loginform' ||
          location.pathname === '/registerform') &&
        null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adoptapet" element={<AdoptAPet />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/adoptapet/petprofile" element={<PetProfile />} />
        <Route path="/rehomeapet" element={<RehomePet />} />
        <Route path="/adoptioninformation" element={<AdoptionInformation />} />
        <Route path="/petcare" element={<PetCare />} />
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} />
    </Router>
  );
};

export default App;
