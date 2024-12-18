import React, { useState } from "react";
import Error from "../../components/Error/Error/Error";
import Logout from "../../components/Logout/Logout";
import { Products } from "../../interfaces";
import { useProduct } from "../../hooks/useProduct/useProduct";

const Home: React.FC = () => {
  const [formData, setFormData] = useState<Products>({
    name: "",
    description: "",
  });
  const { error, loading, addProduct } = useProduct(formData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addProduct();
    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <>
      {error && <Error message={error} />}
      <div className="relative pt-9 bg-gray-300 h-screen">
        <div className="absolute top-4 right-4">
          <Logout />
        </div>

        <div className="max-w-md mx-auto p-3 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Add Product
          </h1>

          <form role="form" onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                name="name"
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg font-semibold text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product description"
              />
            </div>
            <button
              type="submit"
              disabled={
                !!loading ||
                Object.values(formData).some((values) => values === "")
              }
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
