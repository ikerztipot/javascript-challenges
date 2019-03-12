window.onload = () => {

    const canvas = document.querySelector('#draw');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle = '#BADA55';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = '1';

    let isDrawing = false;
    let lastX = 0, lastY = 0, hue = 0;
    let direction = true;

    function draw(e){
        if(!isDrawing) return; //stop the fn from running when they are not moused down

        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];

        if (hue >= 360){
            hue = 0;
        } else{
            hue++;
        }

        if (ctx.lineWidth >= 100 || ctx.lineWidth <= '1')
            direction = !direction

        if (direction){
            ctx.lineWidth++;
        } else{
            ctx.lineWidth--;
        }
    }

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

};