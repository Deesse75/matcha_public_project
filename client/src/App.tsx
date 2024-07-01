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
import Notification from './components/app.utilities/components/Notification';
import GetMe from './pages/home/GetMe';
import Home from './pages/home/Home';
import Signout from './pages/home/clear/Signout';
import DeleteAccount from './pages/home/clear/DeleteAccount';

function App() {
  return (
    <>
      <div className='app'>
        <div className='navbar'>
          <NavBar />
          <Notification />
        </div>
        <div className='routes'>
          <Routes>
            <Route path={appRedir.loading} element={<Loading />} />
            <Route path={appRedir.signin} element={<Signin />} />
            <Route path={appRedir.signup} element={<Signup />} />
            <Route path={appRedir.signout} element={<Signout />} />
            <Route path={appRedir.deleteAccount} element={<DeleteAccount />} />
            <Route path={appRedir.validateEmail} element={<ValidateEmail />} />
            <Route path={appRedir.resendEmail} element={<ResendLinkEmail />} />
            <Route
              path={appRedir.forgotPassword}
              element={<ForgotPassword />}
            />
            <Route path={appRedir.errorServer} element={<ErrorServer />} />
            <Route path={appRedir.errorInternal} element={<ErrorInternal />} />
            <Route path={appRedir.getMe} element={<GetMe />} />
            <Route path={appRedir.home} element={<Home />} />
            <Route path='/*' element={<Error404 />} />
          </Routes>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
