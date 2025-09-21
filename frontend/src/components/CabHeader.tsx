import LoginForm from "./LoginForm";
import MensagemTcc from './MensagemTcc';
import React, { useEffect, useState } from 'react';

interface CabHeaderProps {
  Modal: React.ComponentType<{
    isOpen: boolean;
    onClose: () => void;
    titulo: string;
    children: React.ReactNode;    
  }>;
}

function CabHeader(props: CabHeaderProps){
   
   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
   
   useEffect(() =>{        
      console.log("Como está o login CabHeader", isUserLoggedIn);
    }, [isUserLoggedIn]);

    return(
            <header>
              <section id="Menu" className="bg-warning">
                <nav className="navbar navbar-expand-sm bg-black p-2 text-white">
                    <div className="container-fluid text-black p-1">            
                        <a href="#" className="navbar-brand d-flex align-items-center">                
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" 
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="d-block mx-auto me-2" role="img" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/>
                              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/>
                            </svg>
                            <span className="fw-bold text-warning fs-4">Ori-GenSys</span>                
                        </a>
                                          
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#links">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end" id="links">
                          <ul className="nav nav-pills"> 
                            <li className="nav-item"><a href="#" className="nav-link bg-warning text-black active" aria-current="page">Home</a></li> 
                            <li className="nav-item"><a href="#" className="nav-link text-warning">Funcionalidades</a></li> 
                            <li className="nav-item"><a href="#" className="nav-link text-warning">Contato</a></li> 
                            <li className="nav-item"><a href="#" className="nav-link text-warning">Sobre</a></li>             
                            {!isUserLoggedIn && 
                            <li className="nav-item d-sm-inline"><a href="#" className="btn btn-danger border border-outline-warning" onClick={() => setIsModalVisible(true)}> Login</a></li>}
                            {isUserLoggedIn && 
                            <li className="nav-item d-sm-inline"><a href="#" className="btn btn-danger border border-outline-warning" onClick={() => setIsUserLoggedIn(false)}> Logout</a></li>}
                          </ul>
                        </div>
                    </div>  
                </nav>
              </section>  

              <props.Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} titulo={'Acessar o sistema'}>
                <LoginForm
                    onClose={() => setIsModalVisible(false)}
                    onLoginOk={(status) => {
                      if (status) {
                        console.log("Login confirmado!");                        
                      } else {
                        console.log("Falha no login.");                        
                      }
                      setIsUserLoggedIn(status);
                    }}                    
                  />
              </props.Modal>
              <MensagemTcc 
                    isUserLoggedIn={isUserLoggedIn}
                    onLoginOk={(status) => {
                      if (status) {
                        console.log("Login confirmado!");                        
                      } else {
                        console.log("Falha no login.");                        
                      }
                      setIsUserLoggedIn(status);
                    }} 
                    Modal={props.Modal}/>     
            </header>
    )
}

export default CabHeader;