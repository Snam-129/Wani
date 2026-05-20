import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function OrderSuccess() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const orderId = params.get("id");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/order/${orderId}`,
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi lấy sản phẩm hóa đơn:", error);
      }
    };

    if (orderId) {
      fetchOrderProducts();
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <div className="text-center">
          <div className="text-6xl mb-5">🎉</div>

          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Đặt hàng thành công
          </h1>

          <p className="text-gray-600 mb-2">
            Đơn hàng của bạn đang chờ xác nhận
          </p>

          <p className="text-lg font-semibold mb-10">Mã đơn hàng: #{orderId}</p>
        </div>

        <div className="space-y-5">
          {products.map((item) => (
            <div
              key={item.ProductID}
              className="flex items-center gap-5 border rounded-xl p-4"
            >
              <img
                src={item.Image}
                alt={item.ProductName}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              <div className="flex-1">
                <h2 className="font-bold text-lg">{item.ProductName}</h2>

                <p className="text-gray-500">Số lượng: {item.Quantity}</p>

                <p className="text-orange-500 font-bold mt-1">
                  {Number(item.UnitPrice).toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
