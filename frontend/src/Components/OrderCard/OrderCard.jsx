const OrderCard = ({ order }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

      <div className="flex justify-between mb-4">
        <h4 className="font-semibold">
          Order ID: {order._id}
        </h4>

        <span className="text-cyan-400 font-bold">
          ₹{order.totalAmount}
        </span>
      </div>

      <div className="text-slate-400 mb-4">
        Status: {order.orderStatus}
      </div>

      <div className="space-y-2">
        {order.items.map((item, index) => {
  if (!item.product) return null; // ✅ Prevent crash

  return (
    <div key={index} className="flex justify-between">
      <span>
        {item.name} x {item.quantity}
      </span>

      <span>
        ₹{item.price * item.quantity}
      </span>

      <img
        src={`http://localhost:3000/${
          item.product.images?.[0] || item.product.image
        }`}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded"
      />
    </div>
  );
})}
      </div>

    </div>
  );
};

export default OrderCard;