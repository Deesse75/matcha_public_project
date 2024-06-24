import { Route, Routes } from 'react-router-dom';
import NavBar from './pages/navBar/NavBar';
import { appRedir } from './components/app.configuration/path.config';
import Loading from './pages/loading/Loading';
import Signin from './pages/auth/Signin';
import ValidateEmail from './pages/auth/ValidateEmail';
import Signup from './pages/auth/Signup';
import ResendLinkEmail from './pages/auth/ResendLinkEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ErrorServer from './pages/error/ErrorServer';
import Error404 from './pages/error/Error404';
import ErrorInternal from './pages/error/ErrorInternal';
import Footer from './pages/footer/Footer';
import { useState } from 'react';
import Notification from './components/app.utilities/components/Notification';
import GetMe from './pages/home/GetMe';
import Home from './pages/home/Home';
import Signout from './pages/home/clear/Signout';
import Delete from './pages/home/clear/Delete';

function App() {
  const [notif, setNotif] = useState('');
  const [openAccount, setOpenAccount] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <NavBar
        setOpenAccount={setOpenAccount}
        setOpenProfile={setOpenProfile}
        setOpenChat={setOpenChat}
        setOpenSearch={setOpenSearch}
      />
      <div className='app_container'>
        <Notification notif={notif} setNotif={setNotif} />
        <Routes>
          <Route
            path={appRedir.loading}
            element={<Loading setNotif={setNotif} />}
          />
          <Route
            path={appRedir.signin}
            element={<Signin setNotif={setNotif} />}
          />
          <Route
            path={appRedir.signup}
            element={<Signup setNotif={setNotif} />}
          />
          <Route
            path={appRedir.validateEmail}
            element={<ValidateEmail setNotif={setNotif} />}
          />
          <Route
            path={appRedir.resendEmail}
            element={<ResendLinkEmail setNotif={setNotif} />}
          />
          <Route
            path={appRedir.forgotPassword}
            element={<ForgotPassword setNotif={setNotif} />}
          />
          <Route path={appRedir.errorServer} element={<ErrorServer />} />
          <Route path={appRedir.errorInternal} element={<ErrorInternal />} />
          <Route
            path={appRedir.getMe}
            element={<GetMe setNotif={setNotif} />}
          />
          <Route
            path={appRedir.home}
            element={
              <Home
                openAccount={openAccount}
                openProfile={openProfile}
                openChat={openChat}
                openSearch={openSearch}
              />
            }
          />
          <Route path={appRedir.signout} element={<Signout />} />
          <Route path={appRedir.delete} element={<Delete />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
