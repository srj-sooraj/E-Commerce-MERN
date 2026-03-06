
import { useEffect, useState } from "react";
import API from "../Services/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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

    if (imageFile) {
      for (let i = 0; i < imageFile.length; i++) {
        formData.append("images", imageFile[i]);
      }
    }

    if (editId) {
      //UPDATE PRODUCT
      await API.put(`/products/${editId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Updated Successfully");
    } else {
      //ADD PRODUCT
      await API.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Added Successfully");
    }

    fetchProducts();

    // Reset form
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setStock("");
    setImageFile(null);
    setEditId(null);
    setPreview(null)

  } catch (error) {
    toast.error("Operation failed");
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

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

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
 
  const handleEdit = (product) => {
  setEditId(product._id);
  setName(product.name);
  setPrice(product.price);
  setDescription(product.description);
  setCategory(product.category);
  setStock(product.stock);
  toast("Editing product...");

  window.scrollTo({ top: 0, behavior: "smooth" });
};

// const cancelEdit = () => {
//   setEditId(null);
//   setName("");
//   setPrice("");
//   setDescription("");
//   setCategory("");
//   setStock("");
//   setImageFile(null);
//   toast("Cancel Editing Product...");
// };
const resetForm = () => {
  setEditId(null);
  setName("");
  setPrice("");
  setDescription("");
  setCategory("");
  setStock("");
  setPreview("")
  setImageFile(null);
  toast("cancelled")
};
  return (
  <div className="min-h-screen bg-slate-900 p-8">
    <div className="flex justify-between items-center mb-8">
  <h2 className="text-3xl font-bold">
    Admin Dashboard
  </h2>

  <button
    onClick={() => navigate("/admin/orders")}
    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
  >
    Manage Orders
  </button>
  </div>

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
        multiple
        onChange={(e) => {
          setImageFile(e.target.files);
          setPreview(Array.from(e.target.files).map(file => URL.createObjectURL(file)));
        }}
        className="w-full"
        required={!editId}
      />
        {preview && preview.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="preview"
          className="w-24 h-24 object-cover rounded-lg mt-2 inline-block mr-2"
        />
      ))}

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

        {/* <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-3 rounded-lg transition duration-300"
        >
          {editId ? "Update Product" : "Add Product"}
        </button> */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-3 rounded-lg transition duration-300"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>

        {(name || price || description || category || stock || imageFile) && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Cancel
          </button>
        )}
      </div>
{/* 
        {editId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Cancel
          </button>
  )} */}
      </form>
    </div>

    {/* Products Section */}
    <h3 className="text-2xl font-semibold mb-6">All Products</h3>
    {/* PRODUCT SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full border rounded-lg p-3"
      />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products
        ?.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
        >
         {(product.images?.[0] || product.image) && (
            <img
              src={`http://localhost:3000/${product.images?.[0] || product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4">
            <h4 className="font-semibold text-xl mb-2 truncate text-black">
              {product.name}
            </h4>

            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              Details:{product.description}
            </p>

            <p className="text-green-600 font-bold text-lg mt-2">
             Price : ₹{product.price}
            </p>

            <p className="text-gray-700 text-sm">
              Stock : {product.stock}
            </p>

            {/* LOW STOCK WARNING */}
              <p className={`h-5 ${Number(product.stock) < 5 ? "text-red-500" : "text-transparent"}`}>
                Low Stock
              </p>

            <button
              onClick={() => deleteProduct(product._id)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(product)}
              className="mt-2 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg transition duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default AdminDashboard;
