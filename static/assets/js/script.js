
var popup = new bootstrap.Modal(document.getElementById('popup'), {
    keyboard: true
  })
let sidenav= document.querySelector('.sidenav')
let loadEl=document.querySelectorAll('.load')
let popupbtn=document.getElementById('popup-form-btn')
let suscribebtn=document.getElementById('subscribe')
let nameinput=document.getElementById('name')
let emailinput=document.getElementById('email')
let newsLetterForm=document.getElementById('newsLetterForm')
let suscribeEmail=document.getElementById('newsLetterEmail')

if(sessionStorage.getItem('showed') !== '1'){

        setTimeout(function(){
            popup.show()
         },2000);

    sessionStorage.setItem('showed','1')  
}
window.onload=function(){
    loadEl?.forEach(el=>{
        el.classList.remove('load')
    })
}

// showpopup?.forEach((e)=>{
//     e.addEventListener('click',function(){
//         popup.classList.add('show')
//     })
// })

function download(fileUrl,filename) {

        var element = document.createElement('a');
        element.href=fileUrl
        element.setAttribute('download', filename);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
}
function showError(input,message){
    const formField = input.parentElement;
    const error = formField.querySelector('small');
    error.textContent = message;
}
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
popupbtn?.addEventListener('click',function(e){
   let valid=true 
   let name=nameinput.value
   let email=emailinput.value
   if(name.trim() == ""){
       showError(nameinput,'This is a required field.')
       valid=false
   }else{
    nameinput.parentElement.querySelector('small').textContent=''
    valid=true
   }
   if(email.trim() == "")
   {
       showError(emailinput,'This is a required field.')
       valid=false
   }else if(!isEmailValid(email)){
        showError(emailinput,'Please provide valid email address.')
        valid=false
   }
   else{
    emailinput.parentElement.querySelector('small').textContent=''
    valid=true
   }

   if(valid){
       fetch('/download-whitepaper',{
           method:'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify({
               name,email
           })
       })
       .then(response=> response.json())
       .then(data=>{
            nameinput.value=''
            emailinput.value=''
           download('/assets/valuit-whitepaper.pdf','valuit-whitepaper.pdf')
           popup.hide()
       }).catch(err=>{
           console.log(err)
       })

   }
})


suscribebtn?.addEventListener('click',function(e){
   let valid=true
   let email=suscribeEmail.value
   if(email === "")
   {
       showError(newsLetterForm,'This is a required field.')
       valid=false
   }else if(!isEmailValid(email)){
        showError(newsLetterForm,'Please provide valid email address.')
        valid=false
   }else{
    newsLetterForm.querySelector('small').textContent=''
    valid=true
   }
   if(valid){
        fetch('/newsletter/subscribe',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email
            })
        })
        .then(res=> {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) })
               }
              else {
               return res.json();
             }  
        })
        .then(data=>{        
            console.log(data)
            suscribeEmail.value=''
            newsLetterForm.querySelector('.success').textContent="Email submitted, thank you"
            setTimeout(()=>{
                newsLetterForm.querySelector('.success').textContent=''
            },2000)
        }).catch(err=>{
            console.log(err)
            showError(newsLetterForm,"Email already exists.")
             valid=false
        })
   }
})


document.getElementById('show-sidenav').addEventListener('click',function(){
    sidenav.classList.add('show')
})
document.getElementById('hide-sidenav').addEventListener('click',function(){
    sidenav.classList.remove('show')
})
document.getElementById('close-popup')?.addEventListener('click',function(){
   popup?.hide()
})
