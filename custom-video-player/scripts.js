window.onload = () => {
    /* Get elements */
    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');
    const playButton = player.querySelector('.toggle');
    const ranges = player.querySelectorAll('.player__slider');
    const skipButtons = player.querySelectorAll('[data-skip]');
    const fullScreen = player.querySelector('#full-screen');

    /* Functions */
    function togglePlay(){
        const method = video.paused ? 'play' : 'pause';
        video[method]();
    }

    function changeIcon(){
        playButton.textContent = video.paused ? '▶' : '▍▍';
    }

    function skip(){
        video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleRangeUpdate(){
        video[this.name] = this.value;
    }

    function handleProgress(){
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }

    function scrub(e){
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }

    function toggleFullScreen(){
        if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
          } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
        }
    }

    /* Listeners */
    window.addEventListener('keyup', (e) => {
        console.log(e.code);
        if(e.code === 'Space'){
            togglePlay(e);
        }
    });
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', changeIcon);
    video.addEventListener('pause', changeIcon);
    video.addEventListener('timeupdate', handleProgress);
    playButton.addEventListener('click', togglePlay);
    skipButtons.forEach(button => button.addEventListener('click', skip));
    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub);
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);

    fullScreen.addEventListener('click', toggleFullScreen);
};