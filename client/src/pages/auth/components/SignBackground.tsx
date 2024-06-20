import Attribution from "../../../utils/components/Attribution";
import { bgc } from "../../app.configuration/path.config";

const SignBackground = () => {

  return (
    <>
      <img
        src={bgc.img}
        style={{
          width: '100%',
        }}
      />
      <Attribution author={bgc.author} site={bgc.site} />
    </>
  );};

export default SignBackground;
