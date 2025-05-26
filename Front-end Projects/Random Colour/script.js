const button = document.querySelector('button');
const h4 = document.querySelector('h4');

button.addEventListener('click', function () {
    const newColor = makeRandomColor()
    document.body.style.backgroundColor = newColor;
    h4.innerText = newColor;
})
const makeRandomColor = () => {
    // console.log('CLICK ME!')
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}