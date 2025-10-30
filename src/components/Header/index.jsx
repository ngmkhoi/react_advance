import { useCurrentUser } from '@/features/auth/hooks';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Header.module.scss';
import Button from '@/components/Button';
import { useState } from 'react';
import { logout } from "@/features/auth/authSlice.js";
import * as authService from '@/services/auth';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useCurrentUser();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout())
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

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
                        // Nếu đã đăng nhập - hiển thị thông tin user với dropdown
                        <div className={styles.userWrapper}>
                            <div className={styles.userInfo} onClick={toggleDropdown}>
                                <span className={styles.userName}>
                                    Xin chào, {currentUser.firstName || 'Guest'}
                                </span>
                                <span className={styles.dropdownIcon}>▼</span>
                            </div>
                            {showDropdown && (
                                <div className={styles.dropdown}>
                                    <Button
                                        to="/profile"
                                        primary
                                        rounded
                                        leftIcon={<FontAwesomeIcon icon={faUser}/>}
                                    >
                                    </Button>
                                    <Button
                                        primary
                                        rounded
                                        leftIcon={<FontAwesomeIcon icon={faGear}/>}
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </Button>
                                </div>
                            )}
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