class Calculator{
    constructor(){  
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;      
    }

    clearValues(){
        this.upperValue.textContent = '0'
        this.resultValue.textContent = '0'
    }

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

    refreshTotais(total){
        this.resultValue.textContent = total
        this.upperValue.textContent = total
    }

    resolution(){
        let upperValueArray = (this.upperValue.textContent).split(" ")

        let result = 0

        for(let i =0; i<upperValueArray.length;i++){

            let operation = 0
            let actualItem = upperValueArray[i]

            let val1= upperValueArray[i-1]
            let val2= upperValueArray[i+1]

            if(actualItem == 'x'){
                result = calc.multiplicar(val1,val2)
                operation = 1
            }else if(actualItem == '/'){
                result = calc.dividivir(val1,val2)
                operation = 1

            }else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')){
                if(actualItem == '+'){
                    result = calc.somar(val1,val2)
                    operation = 1
                }else if(actualItem == '-'){
                    result = calc.subtrair(val1,val2)
                    operation = 1
                }
            }

            if(operation){

                upperValueArray[i-1] = result
                upperValueArray.splice(i,2)
                i = 0
            }
        }

        if(result){
            calc.reset = 1     
        }
        calc.refreshTotais(result)
    }

    btnPress(){     
        let input = this.textContent        
        let upperValue = calc.upperValue.textContent    
        var reg = new RegExp('^\\d+$')      

        if(calc.reset && reg.test(input)){
            upperValue = '0'
        }

        calc.reset = 0

        if (input == 'AC') {
            calc.clearValues()
        }else if(input == '='){
            calc.resolution()
        }   
        
        
        
        else {
            
            if(calc.checkLastDigit(input, upperValue, reg)){
                return false
            }
            if(!reg.test(input)){   
                input = ` ${input} `
            }

            if(upperValue == '0'){
                if(reg.test(input)){   
                    calc.upperValue.textContent = input     
                }
            }else{
                calc.upperValue.textContent += input
            }
        }
        
    }

}

let calc = new Calculator()
let buttons = document.querySelectorAll('.btn');

for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click',calc.btnPress); 
}

