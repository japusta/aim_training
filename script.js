const StartBtn = document.querySelector('#start')
const Screens = document.querySelectorAll('.screen')
const TimeList = document.querySelector('#time-list')
const TimeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0
const color = ['00FF00','#20B2AA','#FFFF00','#1E90FF', '#DC143C', '#00FA9A', '#FF7F50', '#7B68EE']

StartBtn.addEventListener('click', (e) => {
    e.preventDefault
    Screens[0].classList.add('up')
})

TimeList.addEventListener('click', e => {
    if(e.target.classList.contains('time-btn')){
        time = parseInt(e.target.getAttribute('data-time'))
        Screens[1].classList.add('up')
        StartGame()
    }
})

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')){
        score++
        e.target.remove()
        CreateRandomTarget()
    }
})

function StartGame(){
    //Screens[1].classList.add('up')
    setInterval(DecreaseTime,1000)
    CreateRandomTarget()
    SetTime(time)
}

function DecreaseTime(){
    if (time === 0){
        FinishGame()
    }

    else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        SetTime(current)
    }
    
}

function SetTime(value) {
    TimeEl.innerHTML = `00:${value}`
}

function FinishGame(){
    TimeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
}

function CreateRandomTarget(){
    const circle = document.createElement('div')
    const size = GetRandomSize(10, 60)
    const new_color = GetRandomColor()
    const {width, height} = board.getBoundingClientRect()

    const x = GetRandomSize(0, width- size)
    const y = GetRandomSize(0, height- size)
     
    circle.classList.add('circle')
    circle.style.background = new_color
    circle.style.boxShadow = `0 0 2px ${new_color}, 0 0 10px ${new_color}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function GetRandomSize(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

function GetRandomColor(){
    const index = Math.floor(Math.random()* color.length)
    return color[index]
}