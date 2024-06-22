const DisplayMiniUserInfo = ({
  username,
  birthdate,
  region,
  gender,
  orientation,
}: {
  username: string;
  birthdate: string;
  region: string;
  gender: string;
  orientation: string;
}) => {
  return (
    <>
    <div className="mini_user">
      <div className=''>{username}</div>
      <div className=''>{birthdate}</div>
      <div className=''>{region}</div>
      <div className=''>{`${gender}, ${orientation}`}</div>
    </div>
    </>
  );
};

export default DisplayMiniUserInfo;
