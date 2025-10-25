import  { useEffect }  from"react";
import { useDispatch, useSelector }  from "react-redux";
import { getCurrentUser } from "@/services/auth/authService";
import { selectCurrentUser } from "./selector";


/**
 * Custom hook để fetch danh sách sản phẩm từ API
 * - Tự động gọi API khi component mount
 * - Sử dụng Redux dispatch để trigger action getProductsList
 * - Chỉ chạy 1 lần khi component được render lần đầu
 */
function useFetchCurrentUser() {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getCurrentUser()); // ✅ Revalidate mỗi lần mount
        }
    }, [dispatch]);
}

/**
 * Custom hook để lấy danh sách sản phẩm từ Redux store
 * @returns {Array} Mảng danh sách sản phẩm từ state
 * - Sử dụng useSelector để đọc dữ liệu từ Redux store
 * - Tự động re-render component khi danh sách sản phẩm thay đổi
 */
function useCurrentUser() {
    const currentUser = useSelector(selectCurrentUser);

    return currentUser;
}


export { useFetchCurrentUser, useCurrentUser };