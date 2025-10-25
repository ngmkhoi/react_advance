import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import Header from '@/components/Header';

function AuthLayout() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout;