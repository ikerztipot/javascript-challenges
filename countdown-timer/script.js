let countdown;
const timeLeftDisplayer = document.querySelector('.display__time-left');
const timeEndDisplayer = document.querySelector('.display__end-time');
const timeButtons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayTimeEnd(then);

    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft)

    }, 1000);

}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timeLeftDisplayer.textContent = display;
}

function displayTimeEnd(seconds){
    const endTime = new Date(seconds);
    const hours = endTime.getHours();
    const minutes = endTime.getMinutes(); 
    timeEndDisplayer.textContent = `Be back at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(ev){
    timer(this.dataset.time);
}

timeButtons.forEach((button)=> button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});