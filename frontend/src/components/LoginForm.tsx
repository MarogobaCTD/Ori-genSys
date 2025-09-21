import React, { useState } from "react";

interface ILoginFormProps {  
  onClose: () => void;
  onLoginOk: (status: boolean) => void;
}

function LoginForm({onClose, onLoginOk}: ILoginFormProps){
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password){
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    if (username == 'Admin' && password == 'admin123') {
        alert("Usuário logado com sucesso !");  
        onLoginOk(true);
     } else {
        alert("Login e senha incorretos! Usuário não logado!");
        onLoginOk(false);
     } 

    setUser('');
    setPassword('');
    onClose();

  };

  return (
      <div className='text-center container'>        
          <form onSubmit={handleSubmit}>
            <input
              className='form-control'
              placeholder="Login"
              name="login"
              required
              value={username}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              className='form-control'
              placeholder="Password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={username.length < 5 ? true : false}
            >
              Logar
            </button>
          </form>
      </div>
  );
};

export default LoginForm;