const templateEmail=(contentHTML)=>{
            var header='<html><head> <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></head>';
            var content='<body><div class="col">'+contentHTML+'</div></body>';
            var footer='</html>'
            return header+content+footer;
}
module.exports =templateEmail;