import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import IsLoading from "../../../components/app.utilities/components/IsLoading";
import { UserContext, statsInitial, userInitial } from "../../../components/app.utilities/context/user.context";
import { appRedir } from "../../../components/app.configuration/path.config";
import { useNavigate } from "react-router-dom";

const Signout = ({
  setNotif,
}: {
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const nav = useNavigate();
  const me = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    const request = async () => {
      try {
        await fetch(appRedir.signout, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ LastConnection: new Date() }),
        });
        Cookies.remove('session');
        me.setUser(userInitial);
        me.setStats(statsInitial);
        nav(appRedir.signin);
      } catch(error) {
        setNotif((error as Error).message);
        nav(appRedir.errorInternal);
      };
    };
    request();
  }, []);
  return (
    <>
      <div>Chargement en cours ...</div>
      <IsLoading />
    </>
  );
};

export default Signout;
