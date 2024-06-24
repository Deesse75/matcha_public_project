import { ProfileType } from "./DisplayFullProfile";

const DisplayMiniUserInfo = ({profile}: {profile: ProfileType} ) => {
  return (
    <>
    <div className="mini_user">
      <div className=''>{profile.username}</div>
      <div className=''>{profile.birthdate}</div>
      <div className=''>{profile.region}</div>
      <div className=''>{`${profile.gender}, ${profile.orientation}`}</div>
    </div>
    </>
  );
};

export default DisplayMiniUserInfo;
