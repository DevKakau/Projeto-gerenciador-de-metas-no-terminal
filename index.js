const {select, input, checkbox} = require('@inquirer/prompts')
const { parse } = require('path')
const fs = require("fs").promises


let metas;
let mensagem = 'Bem vindo ao APP de Metas'

const carregarMetas = async() => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8");
        metas = JSON.parse(dados);
    }
    catch(erro){
        metas = []
    }
}


const salvarMetas = async() => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


const cadastrarMeta = async() =>{
    const meta  = await input( {message: 'Digite a meta:'} );

    if(meta.length == 0){
        mensagem = ('Não pode cadastrar uma meta vazia.')
        return;
        // se eu utilizar somente o return, vai encerrar a função e voltar para o menu, mas se eu quiser posso deixar o usuario preso até ele escrever uma meta basta utilizar o return cadastrarMeta();
    } else if(meta == " "){
        mensagem = ('Não pode cadastrar uma meta vazia');
        return
    }
    metas.push( {value: meta, checked: false }); // adicionando meta ao array; 

    mensagem = 'Meta cadastrada com sucesso';
}

const listarMetas = async() => {

    if(metas.length == 0){
        mensagem = 'Não existe metas'
        return
    }

    const respostas = await checkbox({
        message: 'use as setas para mudar de meta, o espaço para marcar e desmarcar e o Enter para finalizar essa etapa.',
        choices: [...metas],
        instructions: false, // criando uma copia do array metas
    })

    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length === 0 ){
        mensagem = ('Nenhuma meta selecionada!')
        return
    }

    respostas.forEach((resposta) => {
        const meta  =  metas.find((m) => {
            return m.value == resposta
        })

        meta.checked  = true;
    })

    mensagem = ('Meta(s) concluídas(s)')
}

const metasRealizadas = async() =>{
    const realizadas = metas.filter((meta) =>{
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = 'Não existe nenhuma meta realizada! :(';
        return;
    }

    await select({
        message: "Metas Realizadas: "+ realizadas.length,
        choices: [...realizadas]
    })

}

const metasAbertas = async() => {
    const abertas = metas.filter((meta) =>{
        return meta.checked == false;
    })

    if(abertas.length == 0){
        mensagem = 'Não a nenhuma meta em aberto! :)'
        return
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas =async() =>{

    if(metas.length == 0){
        mensagem = 'Não existe metas'
        return;
    }

    const metasDesmarcadas = metas.map((meta) =>{
        return { value: meta.value, checked: false } 
    })

    const itemsADeletar = await checkbox({
        message: 'Selecione um item para deletar.',
        choices: [...metasDesmarcadas],
        instructions: false, // criando uma copia do array metas
    })  
    
    if(itemsADeletar === 0){
        mensagem = ("Nenhum item para deletar");
        return;
    }

  
    itemsADeletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != item
        })
        mensagem = ("Meta(s) deleta(s) com sucesso!");
    })

    
}

const mostrarMensagens = () =>{
    console.clear();
    if(mensagem != ''){
        console.log(mensagem);
        console.log('')
        mensagem = ''
    }
}

const start = async () => {

    await carregarMetas();

    while(true){
        mostrarMensagens(); 

        await salvarMetas();

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
                    name: 'Metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Metas abertas',
                    value: 'abertas'
                },

                {
                    name: 'Deletar metas',
                    value: 'deletar'
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
                break
            case "listar":
                await listarMetas();
                break
            case "realizadas":
                await metasRealizadas();
                break
            case "abertas":
                await metasAbertas();
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Encerrando programa.");
                return
        }
    }
}

start();