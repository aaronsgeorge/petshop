import { Button } from "react-bootstrap";
import NewProduct from "./NewProduct";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const AdminProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  console.log(products);
  return (
    <div>
      <h1>Admin Products</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !products && <p>No products found</p>}

      {products && (
        <div>
          <p>{products.length} products found</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <img src={product.image} alt={product.name} className="w-100" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

   
      <Button className="btn btn-primary">Create Product</Button>
      <NewProduct />
    </div>
  );
};

export default AdminProducts;
