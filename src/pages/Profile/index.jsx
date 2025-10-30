import { useCurrentUser } from '@/features/auth/hooks';
import styles from './Profile.module.scss';

function Profile() {
    const currentUser = useCurrentUser();

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                {/* Header với avatar */}
                <div className={styles.profileHeader}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatar}>
                            {currentUser?.firstName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>
                    <h1 className={styles.userName}>
                        {currentUser?.firstName} {currentUser?.lastName}
                    </h1>
                    <p className={styles.userRole}>Member</p>
                </div>

                {/* Thông tin chi tiết */}
                <div className={styles.profileBody}>
                    <h2 className={styles.sectionTitle}>Thông tin cá nhân</h2>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Email</span>
                            <span className={styles.infoValue}>{currentUser?.email || 'Chưa cập nhật'}</span>
                        </div>

                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Họ</span>
                            <span className={styles.infoValue}>{currentUser?.lastName || 'Chưa cập nhật'}</span>
                        </div>

                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Tên</span>
                            <span className={styles.infoValue}>{currentUser?.firstName || 'Chưa cập nhật'}</span>
                        </div>

                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Ngày tham gia</span>
                            <span className={styles.infoValue}>
                                {currentUser?.createdAt
                                    ? new Date(currentUser.createdAt).toLocaleDateString('vi-VN')
                                    : 'Chưa cập nhật'
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

