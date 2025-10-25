import { Outlet } from "react-router-dom";
import Header from '@/components/Header';
import styles from "./DefaultLayout.module.scss";

function DefaultLayout() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                <Outlet />
            </div>
        </div>
    )
}

export default DefaultLayout;