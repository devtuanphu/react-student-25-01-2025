import axios from "axios"; // Đảm bảo bạn đã cài đặt axios: npm install axios

const API_URL = import.meta.env.VITE_URL_API_FOREVER;

// Hàm thêm sản phẩm
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/product`, productData);
    console.log("Product added successfully:", response.data);
    return response.data; // Trả về dữ liệu sản phẩm đã thêm hoặc thông tin từ server
  } catch (error) {
    console.error(
      "Error adding product:",
      error.response ? error.response.data : error.message
    );
    throw error; // Gửi lỗi ra ngoài để xử lý thêm nếu cần
  }
};
