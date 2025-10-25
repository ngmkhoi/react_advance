import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';

function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
        <div>
            <h1>Login</h1>
        </div>
    )
}

export default Login;