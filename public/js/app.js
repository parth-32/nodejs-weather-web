


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#msg1')
const message_2 = document.querySelector('#msg2')
const message_3 = document.querySelector('#msg3')

message_1.textContent = ''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const searchValue = search.value
    console.log(searchValue)

    message_1.textContent = 'Loading....'
    message_2.textContent = ''
    message_3.textContent = ''

    // fetch(`http://localhost:3000/weather?address=${searchValue}`).then((res)=>{
    fetch('http://localhost:3000/weather?address='+searchValue).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                message_1.textContent = data.error
            } else{
                console.log(data)
                message_1.textContent = data.location+ '  ( '+ searchValue +' )'
                message_2.textContent = 'Teamprature is about '+data.temprature+' C degree'
                message_3.textContent = 'There is '+data.weather
            }
        })
    })

})


// got it  npm run dev  =>ok