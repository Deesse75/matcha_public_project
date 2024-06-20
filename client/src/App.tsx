import { Route, Routes } from 'react-router-dom';
import NavBar from './pages/navBar/NavBar';
import { appRedir } from './pages/app.configuration/path.config';
import Loading from './pages/loading/Loading';
import Signin from './pages/auth/Signin';
import ValidateEmail from './pages/auth/ValidateEmail';
import Signup from './pages/auth/Signup';
import ResendLinkEmail from './pages/auth/ResendLinkEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ErrorServer from './pages/error/ErrorServer';
import Error404 from './pages/error/Error404';
import ErrorInternal from './pages/error/ErrorInternal';
import Footer from './pages/footer/Footer';

function App() {
  return (
    <>
      <div className='navbar_container'>
        <NavBar />
      </div>
      <div className='body_container'>
        <Routes>
        <Route path={appRedir.loading} element={<Loading />} />
        <Route path={appRedir.signin} element={<Signin />} />
        <Route path={appRedir.signup} element={<Signup />} />
        <Route path={appRedir.validateEmail} element={<ValidateEmail />} />
        <Route path={appRedir.resendEmail} element={<ResendLinkEmail />} />
        <Route path={appRedir.forgot} element={<ForgotPassword />} />
        <Route path={appRedir.reset} element={<ResetPassword />} />
        <Route path={appRedir.errorServer} element={<ErrorServer />} />
        <Route path={appRedir.errorInternal} element={<ErrorInternal />} />
        <Route path='/*' element={<Error404 />} />
        </Routes>
      </div>
      <div className="footer"><Footer /></div>
    </>
  );
}

export default App;
