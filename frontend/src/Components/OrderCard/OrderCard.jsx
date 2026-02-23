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
        {order.items.map((item) => (
          <div key={item.product._id} className="flex justify-between">
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>
              ₹{item.product.price * item.quantity}
            </span>
            <img
              src={`http://localhost:3000/${item.product.image}`}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default OrderCard;