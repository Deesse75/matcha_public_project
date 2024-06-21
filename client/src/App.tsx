import { Route, Routes } from 'react-router-dom';
import NavBar from './pages/navBar/NavBar';
import { appRedir } from './pages/app.configuration/path.config';
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
import Notification from './utils/components/Notification';
import GetMe from './pages/home/GetMe';
import Dashboard from './pages/home/Dashboard';

function App() {
  const [notif, setNotif] = useState('');

  return (
    <>
      <NavBar />
      <div className='body_container'>
        <Notification notif={notif} setNotif={setNotif} />
        <Routes>
          <Route path={appRedir.loading} element={<Loading setNotif={setNotif} />} />
          <Route path={appRedir.signin} element={<Signin setNotif={setNotif} />} />
          <Route path={appRedir.signup} element={<Signup setNotif={setNotif} />} />
          <Route path={appRedir.validateEmail} element={<ValidateEmail setNotif={setNotif} />} />
          <Route path={appRedir.resendEmail} element={<ResendLinkEmail setNotif={setNotif} />} />
          <Route path={appRedir.forgotPassword} element={<ForgotPassword setNotif={setNotif} />} />
          <Route path={appRedir.errorServer} element={<ErrorServer />} />
          <Route path={appRedir.errorInternal} element={<ErrorInternal />} />
          <Route path={appRedir.getMe} element={<GetMe setNotif={setNotif} />} />
          <Route path={appRedir.home} element={<Dashboard setNotif={setNotif} />} />
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
