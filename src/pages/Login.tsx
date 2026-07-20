import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin.ts'
import styles from './AuthForm.module.scss'
import { loginSchema, type LoginFormValues } from './Login.schema.ts'

const Login = () => {
  const { submit, error } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit(submit)} noValidate>
        <div className={styles.badge}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 4 13v-1a1 1 0 0 1 1-1h1a7 7 0 0 1 7 7v2z" />
            <path d="M4 21c6-2 10-6 12-12" />
          </svg>
        </div>

        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.subtext}>Log in to continue your streak</p>

        {error && <p className={styles.formError}>{error}</p>}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>

        <div className={styles.footer}>
          <Link className={styles.link} to="/signup">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
