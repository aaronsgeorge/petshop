import NoProductsFoundImg from "../../assets/no-products-found.png";

const NoProductsFound = () => {
  return (
    <div className="text-center pb-4">
      <img src={NoProductsFoundImg} alt="No products found" width={400} />
    </div>
  );
};

export default NoProductsFound;
