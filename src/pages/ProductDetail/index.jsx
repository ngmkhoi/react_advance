import Loading from "@/components/Loading";
import { selectProductsLoading } from "@/features/product";
import { useFetchProductDetail, useProductDetail } from "@/features/product/hooks";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from './ProductDetail.module.scss';
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart, faSpinner } from "@fortawesome/free-solid-svg-icons";

function ProductDetail(){
    const { slug } = useParams();
    useFetchProductDetail(slug);
    const detail = useProductDetail();
    const loading = useSelector(selectProductsLoading);
    const loadingAnimation = true;

    // Kiểm tra nếu đang loading hoặc detail chưa có dữ liệu
    if (loading || !detail) return <Loading />;

    const product = detail;

    return (
        <div className={styles.container}>
            <Button to='/products' bordered leftIcon={<FontAwesomeIcon icon={faArrowLeft}/>}> Quay lại </Button>
            <div className={styles.mainInfo}>
                <img src={product.thumbnail} alt={product.title} className={styles.thumbnail} />
                <div className={styles.details}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.price}>
                        ${product.price}
                        {product.discountPercentage > 0 && (
                            <span className={styles.originalPrice}>
                                ${ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }
                            </span>
                        )}
                    </p>
                    <p className={styles.infoItem}><strong>Thương hiệu:</strong> {product.brand}</p>
                    <p className={styles.infoItem}><strong>Loại:</strong> {product.category}</p>
                    <p className={styles.infoItem}><strong>Đánh giá:</strong> {product.rating} / 5</p>
                    <p className={styles.infoItem}><strong>Còn lại:</strong> {product.stock} sản phẩm</p>
                </div>
            </div>
            <div className={styles.description}>
                <h2>Mô tả sản phẩm</h2>
                <p>{product.description}</p>
            </div>
            <FontAwesomeIcon icon={faHeart} beat/>
            <Button
                style={{
                    backgroundColor: '#ff4081',
                    marginLeft: '10px',
                    '--fa-animation-duration': '1s'
                }} 
                leftIcon={<FontAwesomeIcon spin={loadingAnimation} icon={loadingAnimation ? faSpinner : faHeart}/>}
                disabled
                >
                Đang tải...
            </Button>
        </div>
    )
}

export default ProductDetail;