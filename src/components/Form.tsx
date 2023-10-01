import { useState } from 'react';
import Swal from 'sweetalert2';
import { DataProps } from './Types';

type Props = {
  setCreatePassword: (arg: boolean) => void;
  saveRegisters: (args: DataProps) => void;
};

function CreateForm(props: Props) {
  // STATES
  const [password, setPassword] = useState('');

  const [service, setService] = useState('');

  const [login, setLogin] = useState('');

  const [url, setUrl] = useState('');

  const [showHidePassword, setShowHidePassword] = useState(true);

  // PROPS
  const { setCreatePassword } = props;
  const { saveRegisters } = props;

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
    return !(
      password.length >= 8
      && password.length <= 16
      && regexLetters.test(password)
      && regexNumbers.test(password)
      && regexSpecialCharacters.test(password)
    );
  };

  // VALIDATING SERVICE
  const handleService = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const serviceValue = event.target.value;
    setService(serviceValue);
  };

  const handleRegisterService = () => {
    return service.length < 1;
  };

  // VALIDATING LOGIN
  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const loginValue = event.target.value;
    setLogin(loginValue);
  };

  const handleRegisterLogin = () => {
    return login.length < 1;
  };

  // VALIDATING BUTTON ACTIVATION
  const buttonActivation = () => {
    return (
      handleRegisterPassword()
      || handleRegisterService()
      || handleRegisterLogin()
    );
  };

  // VARIABLES FOR TESTING PASSWORD SEPARATELY
  const regexLetters = /[a-zA-Z]+/;
  const regexNumbers = /\d+/g;
  const regexSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
  const validPasswordClass = 'valid-password-check';
  const invalidPasswordClass = 'invalid-password-check';

  // HANDLE URL
  const handleUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const urlValue = event.target.value;
    setUrl(urlValue);
  };

  // HANDLE SUBMIT
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveRegisters({ name: service, login, password, url });
    Swal.fire({
      title: 'Serviço cadastrado com sucesso',
      icon: 'success',
      timer: 1500,
    });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div id="container">
        <section id="inputs">
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
              type={ showHidePassword ? 'password' : 'text' }
              onChange={ handlePassword }
              value={ password }
              id="senha"
              required
            />
            <button
              data-testid="show-hide-form-password"
              onClick={ (event) => {
                event.preventDefault();
                if (showHidePassword) {
                  setShowHidePassword(false);
                } else {
                  setShowHidePassword(true);
                }
              } }
            >
              Esconder/Mostrar
            </button>
          </label>
          <label htmlFor="URL">
            URL
            <input onChange={ handleUrl } value={ url } type="text" id="URL" />
          </label>
        </section>
        <section id="password-requirements">
          <h5>Sua senha deverá:</h5>
          <p
            className={
              password.length >= 8 ? validPasswordClass : invalidPasswordClass
            }
          >
            Possuir 8 ou mais caracteres
          </p>
          <p
            className={
              password.length <= 16 && password.length >= 8
                ? validPasswordClass
                : invalidPasswordClass
            }
          >
            Possuir até 16 caracteres
          </p>
          <p
            className={
              regexLetters.test(password) && regexNumbers.test(password)
                ? validPasswordClass
                : invalidPasswordClass
            }
          >
            Possuir letras e números
          </p>
          <p
            className={
              regexSpecialCharacters.test(password)
                ? validPasswordClass
                : invalidPasswordClass
            }
          >
            Possuir algum caractere especial
          </p>
        </section>
      </div>
      <button
        disabled={ buttonActivation() }
        type="submit"
      >
        Cadastrar
      </button>
      <button onClick={ () => setCreatePassword(false) }>Cancelar</button>
    </form>
  );
}

export default CreateForm;
