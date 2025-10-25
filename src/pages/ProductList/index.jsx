import Loading from "@/components/Loading";
import { useFetchProductsList, useProductsList } from "@/features/product";
import { selectProductsLoading } from "@/features/product/selector";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";

function ProductList(){
    useFetchProductsList()
    const products = useProductsList();
    const loading = useSelector(selectProductsLoading);

    //if (loading || !products) return <Loading />;

    return (
        <div className={styles.container}>

            <Button to='/provinces' bordered rightIcon={<FontAwesomeIcon icon={faArrowRight}/>}> Qua trang tỉnh thành </Button>

            <h1 className={styles.title}>Danh sách sản phẩm</h1>

            <ul className={styles.grid}>
                {loading ? (
                    <Loading />
                ) : (
                    products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/products/${product.slug}`} className={styles.productCard}>
                            <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
                            <div className={styles.productInfo}>
                                <h2 className={styles.productTitle}>{product.title}</h2>
                                <p className={styles.productPrice}>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(product.price)}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))
                )}
            </ul>
        </div>
    )
}

export default ProductList;