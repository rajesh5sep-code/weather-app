import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default LoaderComponent = () => {
  return (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={20}
      width={30}
      timeout={3000} //3 secs
    />
  );
};
