import { useCurrentUser, useFetchCurrentUser } from '@/features/auth/hooks';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Button from '@/components/Button';

function Header() {
    useFetchCurrentUser();
    const currentUser = useCurrentUser();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo - Click để về trang chủ */}
                <Link to="/" className={styles.logo}>
                    <h1>MyApp</h1>
                </Link>

                {/* Phần hiển thị user hoặc nút đăng nhập/ký */}
                <div className={styles.userSection}>
                    {currentUser ? (
                        // Nếu đã đăng nhập - hiển thị thông tin user
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>
                                Xin chào, {currentUser.firstName || 'Guest'}
                            </span>
                        </div>
                    ) : (
                        // Nếu chưa đăng nhập - hiển thị nút đăng nhập/ký
                        <div className={styles.authButtons}>
                            <Button to="/login">
                                Đăng nhập
                            </Button>
                            <Button to="/register">
                                Đăng ký
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;