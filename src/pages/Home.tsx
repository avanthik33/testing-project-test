import React, { useState } from "react";

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const url = "http://localhost:3001/products/addProduct";
    const {}=useAxios({url,method:"post",headers})
  };
  return (
    <>
      <div className="pt-9">
        <div className="max-w-md mx-auto p-3 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Add Product
          </h1>

          <form>
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
                name="name"
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product description"
              />
            </div>
            <button
              type="submit"
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
