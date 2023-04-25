
import fs from 'fs';
import chalk from 'chalk';


function extraiLinks(texto){
                    // Expressão regular
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura [2]}))

    return resultados.length !== 0 ? resultados : 'não há links nesse arquivo';

}

function trataErro(erro){
    throw new Error(console.log(chalk.red('ERRO ', erro.code, ' - Arquivo não encontrado')));
    
}




// Método 1 ----

function pegaArquivoTres (caminhoArquivo){
    
    const encoding = 'utf8';

    fs.readFile(caminhoArquivo, encoding, (erro, texto) => {

        if(erro){
            trataErro(erro)
        }
        console.log(chalk.blue(texto));

    })
}


// Metodo 2
function pegaArquivoDois (caminhoArquivo){
    const encoding = 'utf-8';

    fs.promises.readFile(caminhoArquivo, encoding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch((erro) => trataErro(erro));
    
}




//Metodo 3
async function pegaArquivo (caminhoArquivo){
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoArquivo, encoding)
        return(extraiLinks(texto)); 
    } catch (erro){
        trataErro(erro)
    }
}

export default pegaArquivo;
// Terror daqueles que temem expressões regulares, inclusive eu:

//   \[[^[\]]*?\]
//   \(https?:\/\/[^\s?#.].[^\s]*\)
//   \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)