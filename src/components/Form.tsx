type Props = {
  setCreatePassword:(arg:boolean) => void;
};

function CreateForm(props: Props) {
  const { setCreatePassword } = props;

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome do serviço
          <input
            // onChange={}
            // value={}
            type="text"
            id="name"
            // required
          />
        </label>
        <label htmlFor="login">
          Login
          <input
            // onChange={}
            // value={}
            type="text"
            id="login"
            // required
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            // onChange={}
            // value={}
            type="password"
            id="senha"
            // required
          />
        </label>
        <label htmlFor="URL">
          URL
          <input
            // onChange={}
            // value={}
            type="text"
            id="URL"
            // required
          />
        </label>
      </form>
      <button>Cadastrar</button>
      <button onClick={ () => setCreatePassword(false) }>Cancelar</button>
    </div>
  );
}

export default CreateForm;
