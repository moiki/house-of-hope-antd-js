import React from "react";
import BlockUi from "react-block-ui";
import { BeatLoader } from "react-spinners";

const CustomLoader = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      {/* <Lottie
				isClickToPauseDisabled
				options={defaultOptionsRadix}
				height={props.size}
				width={props.size}
			/> */}
      <BeatLoader color="primary" loading />
    </div>
  );
};

const LoadingWrapper = ({ className, loading, children, size = "100px" }) => {
  return (
    <BlockUi
      className={className}
      tag="div"
      blocking={loading}
      // loader={<CustomLoader size={size} />}
      loader={<CustomLoader size={size} />}
    >
      {children}
    </BlockUi>
  );
};

export default LoadingWrapper;
