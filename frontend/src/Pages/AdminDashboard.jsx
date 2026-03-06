import { useEffect, useState } from "react";
import API from "../Services/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, Trash2, Edit, Save, PlusCircle, Search, Settings, ArrowLeft, Image as ImageIcon, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

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

        toast.success("Product Updated Successfully", {
          style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
        });
      } else {
        //ADD PRODUCT
        await API.post("/products", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Product Added Successfully", {
          style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
        });
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

      toast.success("Product Deleted", {
        style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
      });
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
    toast("Editing product...", {
      style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setStock("");
    setPreview("")
    setImageFile(null);
    toast("cancelled", {
      style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
    })
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-12 relative overflow-hidden">

      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <LayoutDashboard size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Admin Portal
              </h2>
              <p className="text-slate-400">Manage your store's inventory and orders</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/orders")}
            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg text-sm sm:text-base whitespace-nowrap"
          >
            <Settings size={18} /> Manage Orders
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Add/Edit Product Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl rounded-[2rem] p-8 lg:col-span-1 sticky top-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
              {editId ? <Edit size={20} className="text-emerald-400" /> : <PlusCircle size={20} className="text-emerald-400" />}
              {editId ? "Update Product" : "New Product"}
            </h3>

            <form onSubmit={addProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Name</label>
                <input
                  type="text"
                  placeholder="Ex. Wireless Headphones"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Stock</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Category</label>
                <input
                  type="text"
                  placeholder="Electronics, Clothing, etc."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Description</label>
                <textarea
                  placeholder="Product description go here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 p-3 rounded-xl h-24 resize-none focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                  <ImageIcon size={14} /> Images
                </label>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      setImageFile(e.target.files);
                      setPreview(Array.from(e.target.files).map(file => URL.createObjectURL(file)));
                    }}
                    className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                    required={!editId}
                  />
                </div>
              </div>

              {preview && preview.length > 0 && (
                <div className="flex gap-2 overflow-x-auto py-2 custom-scrollbar">
                  {preview.map((img, index) => (
                    <div key={index} className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] text-slate-950 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {editId ? <><Save size={18} /> Update</> : <><PlusCircle size={18} /> Add</>}
                </motion.button>

                {(name || price || description || category || stock || imageFile) && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={resetForm}
                    className="px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <RefreshCw size={18} />
                  </motion.button>
                )}
              </div>
            </form>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 shadow-2xl">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Package className="text-cyan-400" /> Inventory Insights
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 p-2.5 pl-10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-all text-sm placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence>
                {products
                  ?.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
                  .map((product, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: (idx % 8) * 0.05 }}
                      key={product._id}
                      className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <div className="relative h-44 bg-slate-950">
                        {(product.images?.[0] || product.image) ? (
                          <img
                            src={`http://localhost:3000/${product.images?.[0] || product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover opacity-80"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <ImageIcon size={40} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 w-full h-full" />

                        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-slate-300 shadow-xl">
                          Stock: <span className={Number(product.stock) < 5 ? "text-red-400" : "text-emerald-400"}>{product.stock}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h4 className="font-bold text-lg mb-1 truncate text-white" title={product.name}>
                          {product.name}
                        </h4>

                        <div className="inline-block px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase rounded-md mb-2 tracking-wider w-fit">
                          {product.category}
                        </div>

                        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                          {product.description}
                        </p>

                        <div className="flex justify-between items-end border-t border-slate-800/50 pt-4 mb-4">
                          <p className="text-emerald-400 font-extrabold text-xl tracking-tight">
                            ₹{product.price}
                          </p>

                          {Number(product.stock) < 5 && (
                            <div className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">
                              <AlertCircle size={12} /> Low Stock
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-2 rounded-xl transition-colors flex justify-center items-center gap-1 text-sm"
                          >
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-semibold py-2 rounded-xl transition-colors flex justify-center items-center gap-1 text-sm"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
