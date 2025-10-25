// Import các file ảnh từ thư mục images
import reduximg from './redux.jpg';

// Tạo object chứa tất cả các ảnh để quản lý tập trung
// Lợi ích:
// - Dễ dàng import nhiều ảnh cùng lúc: import images from '@/assets/images'
// - Quản lý tập trung tất cả ảnh ở một nơi
// - Tránh việc phải import từng ảnh riêng lẻ ở nhiều component
const images = {
    reduximg, // Shorthand property: tương đương reduximg: reduximg
};

// Export default để sử dụng:
// import images from '@/assets/images'
// <img src={images.reduximg} />
export default images;