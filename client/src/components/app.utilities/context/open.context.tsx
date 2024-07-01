import { createContext, useState } from 'react';

export const OpenPageContext = createContext<{
  notif: string;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
  openAccount: boolean;
  setOpenAccount: React.Dispatch<React.SetStateAction<boolean>>;
  openProfile: boolean;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  openHome: boolean;
  setOpenHome: React.Dispatch<React.SetStateAction<boolean>>;
  openProfileUp: boolean;
  setOpenProfileUp: React.Dispatch<React.SetStateAction<boolean>>;
  openAccountUp: boolean;
  setOpenAccountUp: React.Dispatch<React.SetStateAction<boolean>>;
  openEmailUp: boolean;
  setOpenEmailUp: React.Dispatch<React.SetStateAction<boolean>>;
  openPasswordUp: boolean;
  setOpenPasswordUp: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  notif: '',
  setNotif: () => {},
  openAccount: false,
  setOpenAccount: () => {},
  openProfile: false,
  setOpenProfile: () => {},
  openChat: false,
  setOpenChat: () => {},
  openSearch: false,
  setOpenSearch: () => {},
  openHome: false,
  setOpenHome: () => {},
  openAccountUp: false,
  setOpenAccountUp: () => {},
  openProfileUp: false,
  setOpenProfileUp: () => {},
  openEmailUp: false,
  setOpenEmailUp: () => {},
  openPasswordUp: false,
  setOpenPasswordUp: () => {},
});

export const OpenPageProvider = ({ children }: { children: React.ReactNode }) => {
  const [notif, setNotif] = useState<string>('');
  const [openAccount, setOpenAccount] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openHome, setOpenHome] = useState<boolean>(true);
  const [openAccountUp, setOpenAccountUp] = useState<boolean>(false);
  const [openProfileUp, setOpenProfileUp] = useState<boolean>(false);
  const [openEmailUp, setOpenEmailUp] = useState<boolean>(false);
  const [openPasswordUp, setOpenPasswordUp] = useState<boolean>(false);

  return <OpenPageContext.Provider value={
    {
      notif,
      setNotif,
      openAccount,
      setOpenAccount,
      openProfile,
      setOpenProfile,
      openChat,
      setOpenChat,
      openSearch,
      setOpenSearch,
      openHome,
      setOpenHome,
      openAccountUp,
      setOpenAccountUp,
      openProfileUp,
      setOpenProfileUp,
      openEmailUp,
      setOpenEmailUp,
      openPasswordUp,
      setOpenPasswordUp,
    }
  }>{children}</OpenPageContext.Provider>;
};
