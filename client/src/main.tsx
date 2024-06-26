import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/index.scss';
import { UserProvider } from './components/app.utilities/context/user.context.tsx';
import { ListProvider } from './components/app.utilities/context/list.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <ListProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ListProvider>
  </UserProvider>,
);
