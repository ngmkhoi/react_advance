import { Link } from 'react-router-dom';
import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/index';

function Register() {
    const { register, handleSubmit, formState: {errors},  watch} = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password_confirmation: ""
        }
    });

    const onSubmit = data => {
        console.log(data);
        // Handle registration logic here   
    }

    console.log(errors);
    

    return(
        <div className={styles.registerContainer}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>First name</label>
                    <input type='text' {...register('firstName', {required: "First name is required"})} placeholder='Enter first name...' />
                    {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Last name</label>
                    <input type='text' {...register('lastName', {required: "Last name is required"})} placeholder='Enter last name...' />
                    {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
                </div>
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
                <div className={styles.formGroup}>
                    <label>Confirm password</label>
                    <input type='password' {...register('password_confirmation', {required: "Password confirmation is required", validate: value => value === watch('password') || "Passwords don't match"})} placeholder='Confirm password...' />
                    {errors.password_confirmation && <span className={styles.error}>{errors.password_confirmation.message}</span>}
                </div>

                <div className={styles.submitBtn}>
                    <Button rounded type='submit' primary>Register</Button>
                </div>

                <p>
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </form>
        </div>
   )
}

export default Register;