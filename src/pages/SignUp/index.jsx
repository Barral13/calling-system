import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (name !== '' && email !== '' && password !== '') {
      await signUp(email, password, name)
    }
  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt='Logo do sistema de chamados' />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Nova Conta</h1>

          <input
            type='text'
            placeholder='Seu nome'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type='text'
            placeholder='exemplo@email.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type='password'
            placeholder='Sua senha'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type='submit'>
            {loadingAuth ? 'Carregando...' : 'Cadastrar'}
          </button>
        </form>

        <Link to="/">Já possui uma conta? Faça login</Link>
      </div>
    </div>
  )
}

export default SignUp;