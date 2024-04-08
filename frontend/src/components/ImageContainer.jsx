import { DEFAULT_IMAGE } from "../constants";

const ImageContainer = ({
  src = DEFAULT_IMAGE,
  size = "100%",
  alt,
  borderRadius = "0px",
}) => {
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${size}`,
    paddingBottom: `${size}`,
    height: 0,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#f2f2f2",
    borderRadius: borderRadius,
  };
  const styles = {
    width: "100%",
    paddingTop: "100%",
    objectFit: "cover",
  };

  return (
    <div style={divStyle}>
      <img src={src} style={styles} alt={alt} />
    </div>
  );
};

export default ImageContainer;
