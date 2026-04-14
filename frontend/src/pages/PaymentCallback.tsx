import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import axios from "axios";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef"); // Lấy mã đơn hàng (hoặc ID) từ VNPay

  useEffect(() => {
    // VNPay trả về mã 00 là giao dịch thành công
    if (vnp_ResponseCode === "00") {
      if (vnp_TxnRef) {
        // Gọi API cập nhật trạng thái đơn hàng thành "Thành công" / "Đã thanh toán"
        // Bạn hãy chắc chắn Backend đã có API này (ví dụ PUT: /api/orders/{id}/status)
        axios
          .put(`https://localhost:7137/api/orders/${vnp_TxnRef}/status`, { status: "Success" })
          .then(() => {
            setStatus("success");
            // Clear thông tin khuyến mãi và giỏ hàng tạm sau khi thanh toán xong
            localStorage.removeItem("selectedPromo");
            // Nếu có API clear giỏ hàng trên DB, bạn có thể gọi luôn ở đây.
          })
          .catch((err) => {
            console.error("Lỗi cập nhật trạng thái đơn hàng trên Database:", err);
            // Vẫn set success vì khách thực tế đã bị trừ tiền, lỗi do backend không cập nhật được
            setStatus("success");
          });
      } else {
        setStatus("success");
      }
    } else if (vnp_ResponseCode) {
      setStatus("error");
      // Nếu vnp_ResponseCode != 00, khách hủy thanh toán hoặc giao dịch lỗi.
      // Bạn có thể gọi API cập nhật status = "Cancel" nếu muốn.
    }
  }, [vnp_ResponseCode]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center font-bold">Đang xử lý kết quả thanh toán...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="bg-white p-10 rounded-xl shadow-sm max-w-md w-full text-center">
        {status === "success" ? (
          <>
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-black uppercase mb-2">Thanh toán thành công</h1>
            <p className="text-gray-500 mb-6">Cảm ơn bạn đã mua sắm tại H&Q Store. Đơn hàng của bạn đã được thanh toán an toàn qua cổng VNPay.</p>
            {vnp_Amount && <p className="font-bold text-lg mb-6">Số tiền: {(Number(vnp_Amount) / 100).toLocaleString()}đ</p>}
          </>
        ) : (
          <>
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-black uppercase mb-2">Thanh toán thất bại</h1>
            <p className="text-gray-500 mb-6">Giao dịch đã bị hủy hoặc xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau.</p>
          </>
        )}
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-black text-white uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-gray-900 transition-colors"
        >
          Quay về Trang chủ
        </button>
      </div>
    </div>
  );
};

export default PaymentCallback;