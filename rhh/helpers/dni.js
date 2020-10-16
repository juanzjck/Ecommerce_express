const dniVerification=(cedula, type)=>{
    var digits=cedula.split('');
    var par=[]
    var inpar=[]
    var sum=0
    if(digits.lenght>10 && type==='Cedula' ){
        return false
    }
    if(digits.lenght>13 && type==='Ruc' ){
        return false
    }
    var cont=1;
    for(i=0;i<9;i++){
       
        if(cont%2>0){
            inpar.push(digits[i])
        }else{
            par.push(digits[i])
        }
        cont++;
    }
    for(i=0;i<inpar.length;i++){
        inpar[i]=inpar[i]*2;
        if(inpar[i]>9){
            inpar[i]=inpar[i]-9;
        }
    }

    for(i=0;i<inpar.length;i++){
      
        sum=sum+Number(inpar[i]);
    }
    for(i=0;i<par.length;i++){

        sum=sum+Number(par[i]);
    }

    var module;
    if(sum>9){
        module= sum%10;
    }else{
        module=sum
    }
    var verification;
    if(module===0){
        verification=0;
    }else{
        verification=10-module;
    }
    
    if(Number(verification)===Number(digits[9])){
        return true
    }
   return false
}


module.exports = dniVerification;