import { useState } from 'react';
import './App.css';
import CreateForm from './components/Form';
import { DataProps } from './components/Types';

function App() {
  const [createPassword, setCreatePassword] = useState(false);

  const [savedRegisters, setSavedRegisters] = useState<DataProps[]>([]);

  const saveRegisters = ({ name, login, password, url }: DataProps) => {
    setSavedRegisters([
      ...savedRegisters,
      {
        name,
        login,
        password,
        url,
      },
    ]);
    setCreatePassword(false);
  };

  return (
    <div>
      <header>
        <h1>Gerenciador de senhas</h1>
      </header>
      {createPassword ? (
        <CreateForm
          setCreatePassword={ setCreatePassword }
          saveRegisters={ saveRegisters }
          savedRegisters={ savedRegisters }
        />
      ) : (
        <button onClick={ () => setCreatePassword(true) }>Cadastrar nova senha</button>
      )}
      { savedRegisters.length === 0
        ? <p>Nenhuma senha cadastrada</p>
        : savedRegisters.map((register) => {
          return (
            <div key={ register.login }>
              <a target="_blank" rel="noreferrer" href={ register.url }>
                {register.name}
              </a>
              <p>
                {register.login}
              </p>
              <p>
                {register.password}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
