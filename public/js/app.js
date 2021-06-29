const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location =search.value
    messageOne.textContent = 'Loading!!!!!'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            // return console.log(data.error)
        }

        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)

    })    
}) 



// fetch('http://localhost:3000/weather?address=Enugu%North').then((response)=>{
//     response.json().then((error,forecast,location)=>{
//         if(error){
//             messageOne.textContent = error

//             return console.log(error)
//         }

//         messageOne.textContent = location
//         messageTwo.textContent = forecast

//         console.log(location)
//         console.log(forecast)
 
//     })
// })


}) 


