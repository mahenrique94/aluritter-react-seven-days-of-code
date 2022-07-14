import classNames from 'classnames'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import App from '../layouts/App'

const SignIn = () => {
  const [authError, setAuthError] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const handleFormSubmit = ({ email, password }) => {
    setAuthenticating(true)
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(credential => {
        localStorage.setItem('access-token', credential.user.accessToken)
        navigate('/')
      })
      .catch(error => {
        console.error(error.message)
        setAuthError(true)
      })
      .finally(() => setAuthenticating(false))
  }

  return (
    <App>
        <div className="flex items-center justify-center w-screen h-screen flex-col">
          <h1 className="font-sans text-3xl text-sky-500 pb-5">Aluritter</h1>
          <form
            className="flex flex-col w-full lg:w-1/4 md:w-1/3 sm:w-1/2 px-10 sm:px-0"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div>
              <input
                {...register('email', { required: true, maxLength: 255, minLength: 5 })}
                className={classNames('w-full p-2 border border-slate-400 rounded text-gray-500 placeholder-slate-400', {
                  'border-red-500': errors.email?.type === 'required',
                })}
                placeholder="email@exemplo.com"
                type="email"
              />
              {errors.email?.type === 'required'
                ? <span className="text-xs text-red-500 pl-1">Email é obrigatório</span>
                : null
              }
              {errors.email?.type === 'minLength'
                ? <span className="text-xs text-red-500 pl-1">O email precisa ter pelo menos cinco caracteres</span>
                : null
              }
            </div>
            <div className="mt-2.5">
              <input
                {...register('password', { required: true, maxLength: 255, minLength: 8 })}
                className={classNames('w-full p-2 border border-slate-400 rounded text-gray-500 placeholder-slate-400', {
                  'border-red-500': !!errors.password,
                })}
                placeholder="Senha"
                type="password"
              />
              {errors.password?.type === 'required'
                ? <span className="text-xs text-red-500 pl-1">Senha é obrigatória</span>
                : null
              }
              {errors.password?.type === 'minLength'
                ? <span className="text-xs text-red-500 pl-1">A senha precisa ter pelo menos oito caracteres</span>
                : null
              }
            </div>
            {authError
              ? <p className="text-xs text-red-500 text-center mt-3">Email ou senha inválidos</p>
              : null
            }
            <button
              className={classNames('mt-5 p-2 rounded bg-emerald-500 text-slate-100', {
                'bg-slate-300': authenticating,
                'hover:bg-emerald-600': !authenticating,
              })}
              disabled={authenticating}
              type="submit"
            >
              Acessar plataforma
            </button>
          </form>
          <span className="text-sm mt-2 text-gray-500">
            Não possui uma conta? <Link className="text-sky-500 hover:underline" to="/sign-up">Crie uma agora!</Link>
          </span>
        </div>
      </App>
  )
}

export default SignIn
