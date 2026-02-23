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
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Added Successfully");
      fetchProducts();

      // reset form
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
      setImageFile(null);

    } catch (error) {
      toast.error("Only Admin can add product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product Deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <h3>Add Product</h3>
      <form onSubmit={addProduct}>
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} /><br/>
        <input placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} /><br/>
        <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} /><br/>

        {/* ✅ FILE INPUT */}
        <input type="file" onChange={(e)=>setImageFile(e.target.files[0])} /><br/>

        <input placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)} /><br/>
        <input placeholder="Stock" value={stock} onChange={(e)=>setStock(e.target.value)} /><br/>

        <button type="submit">Add</button>
      </form>

      <hr />

      <h3>All Products</h3>
      {products.map((product) => (
        <div key={product._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>

          {/* ✅ Show Image */}
          {product.image && (
            <img
              src={`http://localhost:3000/${product.image}`}
              alt={product.name}
              width="120"
            />
          )}

          <br />
          <button onClick={() => deleteProduct(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;