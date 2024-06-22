const DisplayFullProfile = ({ id }: { id: number }) => {
  return (
    <>
      <div className='display'>CECI EST LE PROFIL
      <div>{`USERiD ${id}`}</div>
      </div>
    </>
  );
};

export default DisplayFullProfile;
