import Attribution from '../../../utils/components/Attribution';
import { bgc } from '../../app.configuration/path.config';

const SignBackground = () => {
  const random = (Math.floor(Math.random() * 10) % 4);
  console.log(random)
  return (
    <>
      <img src={bgc[random].img} />
      <Attribution author={bgc[random].author} site={bgc[random].site} />
    </>
  );
};

export default SignBackground;
