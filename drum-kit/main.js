
function playStyleAudio(e)
{
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    
    if(!audio) return; //Stop current function execution
    
    audio.currentTime = 0; //Rewind audio clip to start
    audio.play();
    key.classList.add('playing');
}

function removeTransitionStyle(e)
{
    if(e.propertyName !== 'transform') return;

    this.classList.remove('playing');
}

window.onload = function(e){
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', removeTransitionStyle));
    
    window.addEventListener('keydown', playStyleAudio);
};


