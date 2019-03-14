function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}

window.onload = () => {

    const images = document.querySelectorAll('.slide-in');

    function checkImages(e){
        images.forEach(image => {
            // half way through the image
            const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
            // bottom of the image
            const imageBotton = image.offsetTop + image.height;

            const isHalfShown = slideInAt > image.offsetTop;
            const isNotScrolledPast = window.scrollY < imageBotton;

            if(isHalfShown && isNotScrolledPast){
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', debounce(checkImages));
}