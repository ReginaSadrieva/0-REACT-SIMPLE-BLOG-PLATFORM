// ------------------------------------------------------------------
// Purpose: Registration (Sign Up) page with React Hook Form + Zod validation.
//          Handles client-side validation, server errors, and auto-login after success.
// ------------------------------------------------------------------

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './SignUpPage.module.scss';
import Container from '../components/common/Container';
import Input from '../components/form/Input';
import Button from '../components/button/Button';
import { signUpSchema, type SignUpFormData } from '../validation/authSchemas';
import { registerUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUpPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      login(response.user.token!, response.user);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        const serverErrors = err.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field as keyof SignUpFormData, {
            message: Array.isArray(serverErrors[field])
              ? serverErrors[field].join(', ')
              : serverErrors[field],
          });
        });
      } else {
        setError('root', { message: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <Container>
      <div className={styles.signup}>
        <h1 className={styles.signup__title}>Sign Up</h1>

        <form className={styles.signup__form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input placeholder="Username" {...register('username')} />
            {errors.username && (
              <p className={styles.errorText}>{errors.username.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email address"
              type="email"
              {...register('email')}
            />
            {errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Repeat Password"
              type="password"
              {...register('repeatPassword')}
            />
            {errors.repeatPassword && (
              <p className={styles.errorText}>
                {errors.repeatPassword.message}
              </p>
            )}
          </div>

          <div className={styles.signup__buttonWrapper}>
            <Button text="Sign Up" disabled={isSubmitting} type="submit" />
          </div>

          {errors.root && (
            <p className={styles.errorText}>{errors.root.message}</p>
          )}
        </form>
      </div>
    </Container>
  );
}
