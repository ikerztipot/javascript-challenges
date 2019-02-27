window.onload = function(){

    const inputs = document.querySelectorAll('.controls input');

    function setVariableDefinition(){
        const suffix = this.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', setVariableDefinition));
    inputs.forEach(input => input.addEventListener('mousemove', setVariableDefinition));

}