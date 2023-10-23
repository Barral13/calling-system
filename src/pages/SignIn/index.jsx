
import { useContext, useState } from 'react'
import './styles.css';

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn(event) {
    event.preventDefault();

    if (email !== '' && password !== '') {
      await signIn(email, password);
    }
  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt='Logo do sistema de chamados' />
        </div>

        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input
            type='text'
            placeholder='exemplo@email.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type='password'
            placeholder='Insira a sua senha'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type='submit'>
            {loadingAuth ? 'Carregando...' : 'Acessar'}
          </button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  )
}

export default SignIn