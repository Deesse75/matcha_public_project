import { useContext } from "react";
import { OpenPageContext } from "../../../components/app.utilities/context/open.context";
import DisplayFullProfile from "../display/DisplayFullProfile";
import { UserContext } from "../../../components/app.utilities/context/user.context";

const Profile = () => {
  const setter = useContext(OpenPageContext);
  const me = useContext(UserContext);

  return (
    <>
    <button onClick={() => {setter.setOpenProfileUp(true), setter.setOpenProfile(false)}}>Modifier</button>
    <DisplayFullProfile id={me.user.id} />
    </>
  );
};

export default Profile;
