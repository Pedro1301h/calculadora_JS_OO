class Calculator{
    constructor(){  //executado quando objeto é instanciado
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;      //para limpar número digitados anteriormente
    }

    //Ativa funcionalidade de limpar o display na tecla AC
    clearValues(){
        this.upperValue.textContent = '0'
        this.resultValue.textContent = '0'
    }

    //Checa se precisa adicionar ou não. Permite adicionar apenas um símbolo após número

    checkLastDigit(input, upperValue, reg){
        if((
            !reg.test(input) && 
            !reg.test(upperValue.substr(upperValue.length - 1))
        )){
            return true
        }else{
            return false
        }
    }

    somar(n1,n2){
        return parseFloat(n1) + parseFloat(n2)
    }
    subtrair(n1,n2){
        return parseFloat(n1) - parseFloat(n2)
    }
    multiplicar(n1,n2){
        return parseFloat(n1) * parseFloat(n2)
    }
    dividivir(n1,n2){
        return parseFloat(n1) / parseFloat(n2)
    }

    //Zera os valores do visor após operação
    refreshTotais(total){
        this.resultValue.textContent = total
        this.upperValue.textContent = total
    }

    //resolve a operação
    resolution(){
    //    console.log('teste')     

    //espalha a string do input em array
        let upperValueArray = (this.upperValue.textContent).split(" ") //Quando encontra um espaço 
        // console.log(upperValueArray)

        let result = 0

        for(let i =0; i<upperValueArray.length;i++){

            let operation = 0
            let actualItem = upperValueArray[i]

            let val1= upperValueArray[i-1]
            let val2= upperValueArray[i+1]

            //ordem de precedência das operações:
            if(actualItem == 'x'){
                result = calc.multiplicar(val1,val2)
                operation = 1
            }else if(actualItem == '/'){
                result = calc.dividivir(val1,val2)
                operation = 1
                //caso não exista divisão nem multiplicação:
            }else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')){
                if(actualItem == '+'){
                    result = calc.somar(val1,val2)
                    operation = 1
                }else if(actualItem == '-'){
                    result = calc.subtrair(val1,val2)
                    operation = 1
                }
            }

            //atualiza o valor do operador para próxima iteração
            if(operation){
                //indice anterior do resultado da operação
                upperValueArray[i-1] = result
                //remove os elementos já utilizados para operação
                upperValueArray.splice(i,2)
                //atualizar o valor do índice
                i = 0
            }
        }

        if(result){ //== true
            calc.reset = 1      //reset = true
        }

        //Zera os valores do visor após operação
        calc.refreshTotais(result)
    }

    btnPress(){     //método para todos os botões
        //console.log(this)   //this - revela qual botão foi pressionado
        let input = this.textContent        //Exibe o texto que tem dentro do elemento. No caso, os números de cada botão
        //console.log(input)
        let upperValue = calc.upperValue.textContent    //Exibindo o valor mostrado no visor da calculadora

        //Verifica se o botão pressionado é um número ou símbolo. Utilizando RegEx

        var reg = new RegExp('^\\d+$')      //Aceitar apenas números

        if(calc.reset && reg.test(input)){
            upperValue = '0'
        }

        //limpa a propriedade de reset
        calc.reset = 0

        if (input == 'AC') {
            calc.clearValues()
        }else if(input == '='){
            calc.resolution()
        }   
        
        
        
        else {
            //Checa se precisa adicionar ou não. Permite adicionar apenas um símbolo após número

            if(calc.checkLastDigit(input, upperValue, reg)){
                return false
            }

            //adiciona espaço entre os operadores
            if(!reg.test(input)){   //se não for número
                input = ` ${input} `
            }

            //Verificando se está inciando com 0 no visor. Se sim,elimina-o
            if(upperValue == '0'){
                if(reg.test(input)){    //SE a primeira tecla for número
                    calc.upperValue.textContent = input     //Exibir tecla digitada no visor da calculadora
                }
            }else{
                calc.upperValue.textContent += input
            }
        }
        
    }

}



//Start Object

let calc = new Calculator()

//start btns

let buttons = document.querySelectorAll('.btn');

//console.log(buttons);

//map all buttons - Adicionando evento de clique em todos os botões

for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click',calc.btnPress); //Atrelando o evento de clique ao método do objeto "btnPress". Evita criar um método para cada botão
}

