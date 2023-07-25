let signupForm = document.querySelector('#signup #signupForm');
let errMsg = document.querySelector('#signup #signupForm .errorSignUp .errSignUpMsg');
let errMsgContainer = document.querySelector('#signup #signupForm .errorSignUp');
let phoneNumber = /^[0-9]*$/;
let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function signup(){
    if (signupForm['su-lastname'].value === '' || signupForm['su-firstname'].value === ''
    || signupForm['su-email'].value === '' || signupForm['su-phone'].value === ''
    || signupForm['su-psw'].value === '' || signupForm['su-psw2'].value === ''){
        return errorSignUpRedirect('Veuillez remplir tous les champs obligatoires*');
    }else if (!signupForm['use-terms'].checked){
        return errorSignUpRedirect('Veuillez accepter les conditions d\'utilisation');
    }else if(!signupForm['su-phone'].value.match(phoneNumber)){
        return errorSignUpRedirect('Le numéro de téléphone ne doit contenir que des nombre');
    }else if (signupForm['su-phone'].value.length > 10 || signupForm['su-phone'].value.length < 10){
        return errorSignUpRedirect('Le numéro de téléphone doit être composé de 10 chiffres');
    }else if (signupForm['su-psw'].value != signupForm['su-psw2'].value){
        return errorSignUpRedirect('les champs mot de passe et confirmation doivent être identiques');
    }else if (!signupForm['su-email'].value.match(pattern)){
        return errorSignUpRedirect('veuillez saisir une adresse email valide');
    }else if (signupForm['su-psw'].value.length < 8 || signupForm['su-psw2'].value.length > 30){
        return errorSignUpRedirect('Le mot de passe doit contenir en 8 et 30 caractères');
    }

    let signupData = document.querySelectorAll('#signup #signupForm .su-data');
    let form_data = new FormData();

    for(let count = 0; count < signupData.length; count++){
        form_data.append(signupData[count].name, signupData[count].value);
    }
    document.querySelector('#signup #signupForm #su-submit').disabled = true;

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/inscription-handler');
    xhttp.send(form_data);

    xhttp.onreadystatechange = function (){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            document.querySelector('#signup #signupForm #su-submit').disabled = false;
            document.querySelector('#signup #signupForm').reset();
            if(errMsgContainer.style.display = 'flex'){
                errMsgContainer.style.display = 'none'
            }
            document.querySelector('#signup #signupForm .signupSuccess .suSuccessMsg').innerHTML = 'Compte créé avec succès | Vérifiez votre boîte mail';
            document.querySelector('#signup #signupForm .signupSuccess').style.display = 'flex';
            
            return document.documentElement.scrollTop = 0;
        }
    }

}

function errorSignUpRedirect(message){
    if(errMsgContainer.style.display = 'flex'){
        errMsgContainer.style.display = 'none'
    }
    errMsg.innerHTML = message;
    if(window.innerWidth > 992){
        document.documentElement.scrollTop = 0 ;
    }
    return errMsgContainer.style.display = 'flex';
}
function closeSuccessSignUp(){
    document.querySelector('#signup #signupForm .signupSuccess').style.display = 'none';
}
function closeErrMsgSignUp(){
    return errMsgContainer.style.display = 'none';
}