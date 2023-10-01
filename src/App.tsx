import { useState } from 'react';
import './App.css';
import CreateForm from './components/Form';
import { DataProps } from './components/Types';

function App() {
  const [createPassword, setCreatePassword] = useState(false);

  const [savedRegisters, setSavedRegisters] = useState<DataProps[]>([]);

  const [hidePassword, setHidePassword] = useState(false);

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

  const removeService = (index: number) => {
    const newState = savedRegisters.filter((register, idx) => {
      return idx !== index;
    });
    setSavedRegisters(newState);
  };

  const hideShow = () => {
    const hide = (
      <div id="hide-show">
        <label>
          <input
            type="checkbox"
            onChange={ () => {
              if (hidePassword) {
                setHidePassword(false);
              } else { setHidePassword(true); }
            } }
          />
          Esconder senhas
        </label>
      </div>
    );
    return hide;
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
        />
      ) : (
        <>
          <div id="register-btn-container">
            <button
              id="register-btn"
              onClick={ () => setCreatePassword(true) }
            >
              Cadastrar nova senha
            </button>
          </div>
          <hr />
        </>
      )}
      <div id={ savedRegisters.length > 0 ? 'hide-show' : 'hide-show-hidden' }>
        <label>
          <input
            type={ savedRegisters.length > 0 ? 'checkbox' : 'hidden' }
            onChange={ () => {
              if (hidePassword) {
                setHidePassword(false);
              } else { setHidePassword(true); }
            } }
          />
          Esconder senhas
        </label>
      </div>
      <div id={ savedRegisters.length > 0 ? 'registers-grid' : 'no-password' }>
        { savedRegisters.length === 0
          ? <p>Nenhuma senha cadastrada &#128275;</p>
          : savedRegisters.map((register, index) => {
            return (
              <div id="registered-passwords" key={ index }>

                <a target="_blank" rel="noreferrer" href={ register.url }>
                  {register.name}
                </a>
                <p>
                  {register.login}
                </p>
                { hidePassword
                  ? <p>******</p>
                  : <p>{register.password}</p> }
                <button
                  data-testid="remove-btn"
                  id="remove-btn"
                  onClick={ () => removeService(index) }
                >
                  Remover &#10060;
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
