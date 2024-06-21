import { ImEye } from 'react-icons/im';

const ViewerNum = () => {
  return (
    <>
      <div className='stat'>
        <ImEye size={30} />
        <div className="nbVie">{120}</div>
      </div>
    </>
  );
};

export default ViewerNum;
