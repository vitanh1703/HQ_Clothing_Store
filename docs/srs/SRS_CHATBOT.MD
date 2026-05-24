# 📘 Software Requirement Specification (SRS)
## Chức năng: Tích hợp Chatbot AI tư vấn tự động (Gemini 2.5)
**Mã chức năng:** BOT-01  
**Trạng thái:** Hoàn thành  
**Người soạn thảo:** Diêm Việt Anh  
**Vai trò:** Developer  
**Dự án:** H&Q Clothing Store

---

### 1. Mô tả tổng quan (Description)
Chatbot AI là một trợ lý ảo thông minh được tích hợp trực tiếp trên mọi trang của website H&Q Store (bằng component `<AIChatbot />` dưới dạng Floating Icon). Sử dụng mô hình xử lý ngôn ngữ tự nhiên **Gemini 2.5 Flash** của Google, tính năng này giúp giải đáp thắc mắc, tư vấn chọn size, cung cấp thông tin sản phẩm và chính sách đổi trả cho khách hàng tự động, 24/7 với giọng điệu thân thiện, trẻ trung và chuẩn xác.

### 2. Luồng nghiệp vụ (User Workflow)

| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Truy cập bất kỳ trang nào trên website (Home, Product, Cart...) và click vào biểu tượng Chatbot ở góc phải dưới màn hình. | Mở hộp thoại chat (Chat Window) và hiển thị lời chào mặc định. |
| 2 | Nhập câu hỏi (Ví dụ: "Tư vấn cho mình áo hoodie nam 1m7 65kg"). | Gửi yêu cầu qua API nội bộ (Frontend gọi đến `/api/chatbot/ask`). |
| 3 | Đợi hệ thống phản hồi | Giao diện hiển thị trạng thái "Typing..." (Đang nhập). Backend tiếp nhận yêu cầu, ghép nối `data.txt` và `lịch sử chat` thành một Prompt chuẩn gửi lên Google Gemini API. |
| 4 | Đọc câu trả lời | Backend nhận JSON từ Google, trích xuất text và trả về Frontend. Chatbot phản hồi đúng thông tin size L (theo bộ quy đổi) và giới thiệu các dòng Hoodie của H&Q. |

### 3. Yêu cầu dữ liệu (Data Requirements)

#### 3.1. Dữ liệu huấn luyện (Training Data - Prompt Context)
Chatbot được định hình tính cách và kiến thức dựa trên tệp `data.txt` lưu trên Backend. Thông tin bao gồm:
* **Giới thiệu thương hiệu:** Triết lý Streetwear, định lượng vải (250gsm-350gsm).
* **Chính sách:** Miễn phí giao hàng đơn > 500k, đổi trả 7 ngày, bảo hành đường may khuyết bấm trọn đời.
* **Sản phẩm:** Thông tin các bộ sưu tập (T-shirt, Hoodie, Jogger) kèm mức giá ưu đãi hiện hành.
* **Giọng điệu (Tone):** Tự nhiên, xưng hô "H&Q/Shop" và "Anh/Chị/Mình", có sử dụng emoji phù hợp.

#### 3.2. Quản lý trạng thái & Lịch sử
* **Lịch sử ngữ cảnh (Memory):** Backend sử dụng `_conversationHistory` (List in-memory) lưu trữ lại đoạn hội thoại.
* **Cắt tỉa (Pruning):** Giữ lại tối đa `10` lượt chat gần nhất để tránh tình trạng Prompt quá dài gây tốn Token hoặc lỗi API.

### 4. Ràng buộc kỹ thuật (Technical Constraints)
* **Kiến trúc gọi API:** Frontend KHÔNG gọi trực tiếp Google API (tránh lộ API Key). Backend đóng vai trò như một Proxy: Nhận text -> Build Prompt -> Gọi `generativelanguage.googleapis.com` -> Trả kết quả về Frontend.
* **Bảo mật API Key:** Lấy từ biến môi trường `GEMINI_API_KEY` hoặc đọc từ file bảo mật `api_key.txt`.
* **Response Parsing:** Backend phải Parse an toàn cấu trúc trả về từ Google: `candidates[0].content.parts[0].text`. Nếu API lỗi, trả về nguyên bản chuỗi báo lỗi để debug.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)

| Tình huống | Hành động xử lý |
| :--- | :--- |
| **Mất mạng / Google API sập** | Bắt Catch Exception, trả về message báo lỗi lịch sự: "Hệ thống AI đang bảo trì, vui lòng liên hệ Hotline 0123 456 789". |
| **Lỗi không tìm thấy API Key** | Backend bypass chuỗi "KEY_NOT_FOUND". Cuộc gọi đi bị từ chối `400 Bad Request` từ Google, trả log chi tiết về console. |
| **Hỏi những câu nằm ngoài lĩnh vực** | Chatbot được gán Role "Tư vấn thời trang H&Q" trong Prompt, nó sẽ khéo léo từ chối trả lời hoặc chuyển hướng về chủ đề quần áo Streetwear. |

### 6. Giao diện (UI/UX)
* **Floating Button:** Gắn cứng (position: fixed) ở góc dưới cùng bên phải màn hình để không che khuất nội dung website.
* **Chat Interface:** Giao diện giống tin nhắn Messenger/Zalo. Phân biệt màu sắc rõ ràng giữa tin nhắn của Khách (User) và tin nhắn của H&Q (Assistant).
* **Animations:** Các hiệu ứng mở cửa sổ chat, scroll mượt xuống tin nhắn mới nhất và biểu tượng Loading khi chờ phản hồi.