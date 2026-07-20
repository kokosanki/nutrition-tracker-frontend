import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import styles from './Signup.module.scss'
import { signupSchema, type SignupFormValues } from './Signup.schema.ts'

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = (data: SignupFormValues) => {
    console.log(data)
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Sign up</h1>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input className={styles.input} id="name" type="text" {...register('name')} />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input className={styles.input} id="email" type="email" {...register('email')} />
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
            {...register('password')}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            className={styles.input}
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button className={styles.submit} type="submit">
          Sign up
        </button>
      </form>
    </div>
  )
}

export default Signup
