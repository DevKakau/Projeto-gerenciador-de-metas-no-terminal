const {select, input} = require('@inquirer/prompts')

let meta = {
    value: "Beber 3l de água",
    checked: false
}

let metas = [meta]

const cadastrarMeta = async() =>{
    const meta  = await input( {message: 'Digite a meta:'} );

    if(meta.length == 0){
        console.log('Não pode cadastrar uma meta vazia.')
        return;
        // se eu utilizar somente o return, vai encerrar a função e voltar para o menu, mas se eu quiser posso deixar o usuario preso até ele escrever uma meta basta utilizar o return cadastrarMeta();
    }
    metas.push( {value: meta, checked: false }); // adicionando meta ao array; 
}

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
                await cadastrarMeta();
                console.log(metas);
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