import  { useEffect }  from"react";
import { useDispatch, useSelector }  from "react-redux";

import { getProductDetail, getProductsList } from "@/services/product/productService";
import { selectProductDetail, selectProductsList } from "./selector";


/**
 * Custom hook để fetch danh sách sản phẩm từ API
 * - Tự động gọi API khi component mount
 * - Sử dụng Redux dispatch để trigger action getProductsList
 * - Chỉ chạy 1 lần khi component được render lần đầu
 */
function useFetchProductsList() {
    const dispatch = useDispatch();

     useEffect(() => {
        dispatch(getProductsList())
    }, [dispatch])
}

function useFetchProductDetail(slug) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetail(slug))
    }, [dispatch, slug])
}

/**
 * Custom hook để lấy danh sách sản phẩm từ Redux store
 * @returns {Array} Mảng danh sách sản phẩm từ state
 * - Sử dụng useSelector để đọc dữ liệu từ Redux store
 * - Tự động re-render component khi danh sách sản phẩm thay đổi
 */
function useProductsList() {
    const products = useSelector(selectProductsList);

    return products;
}

function useProductDetail() {
    const details = useSelector(selectProductDetail)    
    return details;
}

export { useFetchProductsList, useProductsList, useFetchProductDetail, useProductDetail };