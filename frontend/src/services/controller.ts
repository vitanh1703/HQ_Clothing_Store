export const authController = {
  validateLogin: (email: string, password: string) => {
    if (!email || !password) {
      return { success: false, message: "Vui lòng nhập đầy đủ email và mật khẩu!" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Định dạng email không hợp lệ!" };
    }
    return { success: true };
  },
  
  validateRegister: (data: any) => {
    const { name, lastname, email, password, confirmPassword } = data;
    
    if (!name || !lastname || !email || !password || !confirmPassword) {
      return { success: false, message: "Vui lòng điền đầy đủ thông tin!" };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Email không hợp lệ!" };
    }

    if (password.length < 6) {
      return { success: false, message: "Mật khẩu phải từ 6 ký tự trở lên!" };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Mật khẩu xác nhận không khớp!" };
    }

    return { success: true };
  }

};

export const checkoutController = {
  validateCheckout: (data: any) => {
    const { fullName, email, phone, address } = data;

    // check rỗng
    if (!fullName || !email || !phone || !address) {
      return {
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin giao hàng!",
      };
    }

    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Email không hợp lệ!",
      };
    }

    // phone VN
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return {
        success: false,
        message: "Số điện thoại không hợp lệ!",
      };
    }

    // tên
    if (fullName.trim().length < 2) {
      return {
        success: false,
        message: "Họ tên quá ngắn!",
      };
    }

    // địa chỉ
    if (address.trim().length < 5) {
      return {
        success: false,
        message: "Địa chỉ không hợp lệ!",
      };
    }

    return { success: true };
  },
};