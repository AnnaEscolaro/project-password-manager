import { useState } from 'react';
import './App.css';
import CreateForm from './components/Form';

function App() {
  const [createPassword, setCreatePassword] = useState(false);

  return (
    <div>
      <header>
        <h1>Gerenciador de senhas</h1>
      </header>
      {createPassword ? (
        <CreateForm setCreatePassword={ setCreatePassword } />
      ) : (
        <button onClick={ () => setCreatePassword(true) }>Cadastrar nova senha</button>
      )}
    </div>
  );
}

export default App;
