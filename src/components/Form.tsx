import { useState } from 'react';

type Props = {
  setCreatePassword:(arg:boolean) => void;
};

function CreateForm(props: Props) {
  const [password, setPassword] = useState('');

  const [service, setService] = useState('');

  const [login, setLogin] = useState('');

  const { setCreatePassword } = props;

  // VALIDATING PASSWORD
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };

  const handleRegisterPassword = () => {
    // const regex = /^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/g;
    const regexLetters = /[a-zA-Z]+/;
    const regexNumbers = /\d+/g;
    const regexSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
    return !(password.length >= 8
      && password.length <= 16
      && regexLetters.test(password)
      && regexNumbers.test(password)
      && regexSpecialCharacters.test(password));
  };

  // VALIDATING SERVICE
  const handleService = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const serviceValue = event.target.value;
    setService(serviceValue);
  };

  const handleRegisterService = () => {
    return (service.length < 1);
  };

  // VALIDATING LOGIN
  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const loginValue = event.target.value;
    setLogin(loginValue);
  };

  const handleRegisterLogin = () => {
    return (login.length < 1);
  };

  // VALIDATING BUTTON ACTIVATION
  const buttonActivation = () => {
    console.log(handleRegisterPassword());
    return (handleRegisterPassword() || handleRegisterService() || handleRegisterLogin());
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome do serviço
          <input
            onChange={ handleService }
            value={ service }
            type="text"
            id="name"
            required
          />
        </label>
        <label htmlFor="login">
          Login
          <input
            onChange={ handleLogin }
            value={ login }
            type="text"
            id="login"
            required
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            onChange={ handlePassword }
            value={ password }
            type="password"
            id="senha"
            required
          />
        </label>
        <label htmlFor="URL">
          URL
          <input
            // onChange={}
            // value={}
            type="text"
            id="URL"
          />
        </label>
      </form>
      <button disabled={ buttonActivation() }>Cadastrar</button>
      <button onClick={ () => setCreatePassword(false) }>Cancelar</button>
    </div>
  );
}

export default CreateForm;
