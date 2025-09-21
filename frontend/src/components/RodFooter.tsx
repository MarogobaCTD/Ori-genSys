function RodFooter() {

    return (
        <footer className="justify-content-between bg-black">
            <div className="container-fluid text-black p-1">  
                <div className="d-flex flex-column flex-sm-row justify-content-center border-bottom border-warning text-warning">
                    <p className="justify-center pb-2 mb-2">Marcelo Barbosà - 1o Semestre - Desenvolvimento Web e Mobile - 
                        <a href="https://www.ifsudestemg.edu.br/">IFSudesteMG</a> -
                        <a href="mailto:marogoba@gmail.com">marogoba@gmail.com</a> -
                        * Imagens dos cards tiradas do site: <a href="https://www.iconfinder.com/">iconfinder</a> 
                    </p>                
                </div>                
                <div className="d-flex flex-column flex-sm-row justify-content-between "> 
                    <div className="col-md-2 d-flex align-items-center p-1"> 
                        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"> 
                        <img src="./src/icons/OriGenSys.svg" width="32" height="32" alt="Shop"/>
                        </a> 
                        <span className="mb-3 mb-md-0 text-warning ">&copy; 2025 Ori-GenSys</span> 
                    </div> 
                    <ul className="list-unstyled d-flex "> 
                        <li className="ms-3 p-1">
                        <a className="text-warning" href="https://www.linkedin.com/in/marcelo-barbosa-b4517727/" aria-label="linkedin">
                            <svg className="bi" width="24" height="24" aria-hidden="true" fill="currentColor">
                            <use xlinkHref="#linkedin"></use>
                            </svg>
                        </a>
                        </li> 
                        <li className="ms-3 p-1">
                        <a className="text-warning" href="https://www.instagram.com/marcelorgbarbosa/" aria-label="Instagram">
                            <svg className="bi" width="24" height="24" aria-hidden="true" fill="currentColor">
                            <use xlinkHref="#instagram"></use>
                            </svg>
                        </a>
                        </li> 
                        <li className="ms-3 p-1">
                        <a className="text-warning" href="https://www.facebook.com/marogoba" aria-label="Facebook">
                            <svg className="bi" width="24" height="24" fill="currentColor">
                            <use xlinkHref="#facebook"></use>
                            </svg>
                        </a>
                        </li> 
                    </ul> 
                </div> 
            </div>                
        </footer>         
    )
}

export default RodFooter;