import { ProductsProps } from "../interfaces";

const Products: React.FC<ProductsProps> = ({ products }) => {
  console.log(products);
  return (
    <div className="space-y-6">
      {products.map((value, index) => {
        return (
          <div
            key={index}
            className="bg-white mt-9 p-3 rounded-lg shadow-md max-w-lg mx-auto"
          >
            <h1 className="text-2xl font-semibold text-gray-800">
              {value.name}
            </h1>
            <p className="text-gray-600 mt-2 overflow-hidden text-ellipsis line-clamp-3">
              {value.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
