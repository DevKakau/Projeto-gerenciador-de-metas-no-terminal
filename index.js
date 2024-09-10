const {select} = require('@inquirer/prompts')



const start = async () => {

    while(true){

        const opcao = await select({
            message: 'Menu >',
            choices: [
                {
                    name: 'Cadastrar meta',
                    value: 'cadastrar'
                },

                {
                    name: 'Listar metas',
                    value: 'listar'

                },

                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                console.log("Meta cadastrada com sucesso.");
                break
            case "listar":
                console.log("Vamos Listar");
                break
            case "sair":
                console.log("Encerrando programa.");
                return
        }
    }
}

start();