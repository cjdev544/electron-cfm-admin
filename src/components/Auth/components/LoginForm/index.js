import { useState } from 'react'
import { Button, Form, Icon, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import useAuth from '../../../../hooks/useAuth'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleErrors = (code) => {
    switch (code) {
      case 'auth/wrong-password':
        toast.error('Combinación de correo y contraseña incorracta')
        break
      case 'auth/user-not-found':
        toast.error('Combinación de correo y contraseña incorrecta')
        break
      case 'auth/too-many-requests':
        toast.error(
          'Ha tenido muchas reenvios en poco tiempo. Intente mas tarde'
        )
        break
      default:
        toast.error('Error al iniciar sesión')
        break
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateEmail = (email) => {
    const validation =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return validation.test(String(email).toLowerCase())
  }

  const handleSubmit = () => {
    let errors = {}
    let formOk = true

    setFormError({})

    if (!validateEmail(email)) {
      errors.email = true
      formOk = false
    }

    if (password.trim().length < 1) {
      errors.password = true
      formOk = false
    }

    setFormError(errors)

    if (formOk) {
      setIsLoading(true)

      login(setIsLoading, handleErrors, email, password)
    }
  }

  return (
    <div className='login-form'>
      <h1>Inicia sesión</h1>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Form.Field>
          <Input
            type='text'
            name='email'
            placeholder='Correo electrónico'
            icon='mail outline'
            error={formError.email}
          />
          {formError.email && (
            <span className='error-text'>El correo debe ser válido</span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Contraseña'
            icon={
              showPassword ? (
                <Icon
                  name='eye slash outline'
                  link
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Icon
                  name='eye'
                  link
                  onClick={() => setShowPassword(!showPassword)}
                />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className='error-text'>La contraseña es obligatoria</span>
          )}
        </Form.Field>
        <Button type='submit' loading={isLoading}>
          Iniciar sesión
        </Button>
      </Form>
    </div>
  )
}
