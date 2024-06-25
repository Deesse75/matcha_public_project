import { MiniProfile } from "../interfaces/profile.interfaces";

const DisplayMiniUserInfo = ({miniProfile}: {miniProfile: MiniProfile} ) => {
  return (
    <>
    <div className="mini_user">
      <div className=''>{miniProfile.username}</div>
      <div className=''>{miniProfile.birthdate}</div>
      <div className=''>{miniProfile.region}</div>
      <div className=''>{`${miniProfile.gender}, ${miniProfile.orientation}`}</div>
    </div>
    </>
  );
};

export default DisplayMiniUserInfo;
