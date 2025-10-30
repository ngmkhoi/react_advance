import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as authService from '@/services/auth/authService'
import styles from "@/pages/Auth/Register/Register.module.scss";
import Button from "@/components/Button/index.jsx";
import {useDispatch} from "react-redux";
import {getCurrentUser} from "@/services/auth/authService";

function Login() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            email: "khoivippro123@gmail.com",
            password: "Mkhoi0411",
        }
    });

    const onSubmit = async (data) => {
        const { access_token } = await authService.login(data)
        if(access_token){
            localStorage.setItem('access_token', access_token)
            await dispatch(getCurrentUser())
            const redirectTo = searchParams.get('redirectTo') || '/'
            navigate(redirectTo)
        }
    }

    return(
        <div className={styles.registerContainer}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type='email' {...register('email', {required: "Email is required"})} placeholder='Enter email...' />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type='password' {...register('password', {required: "Password is required", minLength: {value: 6, message: "Password must be at least 6 characters"}})} placeholder='Enter password...' />
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </div>

                <div className={styles.submitBtn}>
                    <Button rounded type='submit' primary>Login</Button>
                </div>

                <p>
                    Doesn't have an account? <Link to='/register'>register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login;