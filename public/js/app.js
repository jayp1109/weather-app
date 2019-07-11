const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector ('#message-1')
const messageTwo  = document.querySelector('#message-2')

//messageOne.textContent='test'
weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading One ...'
    messageOne.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
         response.json().then((data)=>{
            if(data.error){
                //console.log(error)
                messageOne.textContent = data.error
            }else{
                const message = 'The current temperature is '+ data.forecastData.temperature +
                ' with ' +data.forecastData.rainProbability+ '% of rain prediction'
                messageOne.textContent = data.location

                messageTwo.textContent = message
               // console.log(data.location)
                //console.log(data.forecastData)
             }
         })
    })
})

