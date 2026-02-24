// import { useEffect, useState } from "react";
// import API from "../Services/api.js";

// function AdminDashboard() {
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [category, setCategory] = useState("");
//   const [stock, setStock] = useState("");

//   const fetchProducts = async () => {
//     try {
//       const { data } = await API.get("/products");
//       setProducts(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const addProduct = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/products", {
//         name,
//         price,
//         description,
//         image,
//         category,
//         stock,
//       });

//       alert("Product Added");
//       fetchProducts();
//     } catch (error) {
//       alert("Only Admin can add product");
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await API.delete(`/products/${id}`);
//       fetchProducts();
//     } catch (error) {
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Dashboard</h2>

//       <h3>Add Product</h3>
//       <form onSubmit={addProduct}>
//         <input placeholder="Name" onChange={(e)=>setName(e.target.value)} /><br/>
//         <input placeholder="Price" onChange={(e)=>setPrice(e.target.value)} /><br/>
//         <input placeholder="Description" onChange={(e)=>setDescription(e.target.value)} /><br/>
//         <input placeholder="Image" onChange={(e)=>setImage(e.target.value)} /><br/>
//         <input placeholder="Category" onChange={(e)=>setCategory(e.target.value)} /><br/>
//         <input placeholder="Stock" onChange={(e)=>setStock(e.target.value)} /><br/>
//         <button type="submit">Add</button>
//       </form>

//       <hr />

//       <h3>All Products</h3>
//       {products.map((product) => (
//         <div key={product._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//           <h4>{product.name}</h4>
//           <p>₹{product.price}</p>
//           <button onClick={() => deleteProduct(product._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AdminDashboard;


import { useEffect, useState } from "react";
import API from "../Services/api.js";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // const addProduct = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("price", price);
  //     formData.append("description", description);
  //     formData.append("category", category);
  //     formData.append("stock", stock);
  //     formData.append("image", imageFile);

  //     await API.post("/products", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     toast.success("Product Added Successfully");
  //     fetchProducts();

  //     // reset form
  //     setName("");
  //     setPrice("");
  //     setDescription("");
  //     setCategory("");
  //     setStock("");
  //     setImageFile(null);

  //   } catch (error) {
  //     toast.error("Only Admin can add product");
  //   }
  // };

  const addProduct = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("image", imageFile);

    await API.post("/products", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Product Added Successfully");
    fetchProducts();

  } catch (error) {
    toast.error("Only Admin can add product");
  }
  };

  // const deleteProduct = async (id) => {
  //   try {
  //     await API.delete(`/products/${id}`);
  //     toast.success("Product Deleted");
  //     fetchProducts();
  //   } catch (error) {
  //     toast.error("Delete failed");
  //   }
  // };

    const deleteProduct = async (id) => {
  try {
    await API.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    toast.success("Product Deleted");
    fetchProducts();

  } catch (error) {
    toast.error("Delete failed");
  }
};
  return (
  <div className="min-h-screen bg-slate-900 p-8">
    <h2 className="text-3xl font-bold mb-8 text-center">
      Admin Dashboard
    </h2>

    {/* Add Product Card */}
    <div className="bg-black shadow-xl rounded-2xl p-6 max-w-3xl mx-auto mb-12">
      <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

      <form onSubmit={addProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-3 rounded-lg transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>

    {/* Products Section */}
    <h3 className="text-2xl font-semibold mb-6">All Products</h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
        >
          {product.image && (
            <img
              src={`http://localhost:3000/${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4">
            <h4 className="font-semibold text-lg mb-2 truncate">
              {product.name}
            </h4>

            <p className="text-green-600 font-bold text-lg">
              ₹{product.price}
            </p>

            <button
              onClick={() => deleteProduct(product._id)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default AdminDashboard;