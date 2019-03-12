window.onload = () => {

    const inputs = document.querySelectorAll('.inbox input[type="checkbox"]');
    let lastChecked;
    let inBetween = false;

    function checkInputs(e){
        if (e.shiftKey && this.checked) {
            inputs.forEach(input => {
                
                if(input === this || input === lastChecked){
                    inBetween = !inBetween;
                }

                if(inBetween){
                    input.checked = true;
                }
            });
        }
        lastChecked = this;
    }

    inputs.forEach(input => input.addEventListener('click', checkInputs));
};