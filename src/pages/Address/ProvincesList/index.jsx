import Loading from '@/components/Loading';
import { useGetProvincesQuery } from '@/features/address/addressSlice'
import styles from './ProvincesList.module.scss';
import Button from '@/components/Button';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProvincesList() {
    const {isLoading, data: provinces} = useGetProvincesQuery();

    if(isLoading || !provinces) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <Button to='/products' bordered leftIcon={<FontAwesomeIcon icon={faArrowLeft}/>}> Quay lại </Button>
            <h1 className={styles.title}>Danh sách tỉnh thành</h1>
            <ul className={styles.list}>
               {provinces.map((province) => (
                    <li key={province.province_id} className={styles.item}>{province.name}</li>
               ))}
            </ul>
        </div>
    )
}

export default ProvincesList;