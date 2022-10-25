import LoginForm from './components/LoginForm'
import BackgroundAuth from '../../assets/jpg/fondo.jpg'
import LogoNameWhite from '../../assets/png/logo.png'
import styles from './Auth.module.css'

export default function Auth() {
  return (
    <div
      className={styles.auth}
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
    >
      <div className={styles.dark} />
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={LogoNameWhite} alt='Logo Centralfood' />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
