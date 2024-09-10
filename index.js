const start = () => {

    while(true){
        let opcao = "sair"
        switch(opcao){
            case "cadastrar":
                console.log("Vamos cadastrar");
                break
            case "Listar":
                console.log("Vamos Listar");
                break
            case "sair":
                console.log("Vamos sair");
                return
        }
    }
}

start();