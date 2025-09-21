function Apresentacao () {
    return (
        <div className="row overflow-hidden border border-2 bg-light shadow-lg rounded">
            <div className="col-md-5 p-lg-2 mx-auto my-6">
                <h1 className="display-4 fw-bold">Vem aí...</h1>
                <h2 className="display-5 fw-bold text-danger" style={{ fontFamily: "'Pacifico', cursive" }}>"Ori-GenSys!"</h2>
                <p className="lead fw-normal">É uma aplicação que ajudará na administração e gerenciamento de projetos culturais aprovados para Agentes Culturais, permitindo criar cadastros de proponentes, artistas, fotos, imagens, portifólios, além de gerenciar os contratos, atividades, pagamentos, eventos e outros processos. Agora sim os Agentes Culturais pessoa física ou pessoa jurídicas terão uma ferramenta voltada totalmente para atividades culturais!</p>
                <a className="btn btn-danger" href="#">Em Breve</a>
            </div>
            <div className="col-5 p-lg-1 mx-auto my-1">
                <img src="./public/images/OriGenSys_SemFundo.png" className="img-fluid" width="500px" />
            </div>
        </div> 
    )
}

export default Apresentacao;