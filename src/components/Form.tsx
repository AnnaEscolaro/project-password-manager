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
    return (handleRegisterPassword() || handleRegisterService() || handleRegisterLogin());
  };

  // VARIABLES FOR TESTING PASSWORD SEPARATELY
  const regexLetters = /[a-zA-Z]+/;
  const regexNumbers = /\d+/g;
  const regexSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
  const validPasswordClass = 'valid-password-check';
  const invalidPasswordClass = 'invalid-password-check';

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
        <h5>Sua senha deverá:</h5>
        <p
          className={ password.length >= 8
            ? validPasswordClass
            : invalidPasswordClass }
        >
          Possuir 8 ou mais caracteres
        </p>
        <p
          className={ password.length <= 16 && password.length >= 8
            ? validPasswordClass
            : invalidPasswordClass }
        >
          Possuir até 16 caracteres
        </p>
        <p
          className={ regexLetters.test(password) && regexNumbers.test(password)
            ? validPasswordClass
            : invalidPasswordClass }
        >
          Possuir letras e números
        </p>
        <p
          className={ regexSpecialCharacters.test(password)
            ? validPasswordClass
            : invalidPasswordClass }
        >
          Possuir algum caractere especial
        </p>
      </form>
      <button disabled={ buttonActivation() }>Cadastrar</button>
      <button onClick={ () => setCreatePassword(false) }>Cancelar</button>
    </div>
  );
}

export default CreateForm;
