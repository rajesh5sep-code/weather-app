import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import loaderCss from "../styles/Loader.module.scss";

const LoaderComponent = () => {
  return (
    <div className={loaderCss.loader}>
      <Loader type="Circles" color="#0400ff" height={80} width={80} />
    </div>
  );
};

export default LoaderComponent;
