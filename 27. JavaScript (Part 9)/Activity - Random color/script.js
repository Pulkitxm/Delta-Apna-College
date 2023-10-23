btn = document.querySelector('button')
div = document.querySelector('div')
head = document.querySelector('h3')

btn.addEventListener("click",()=>{
    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);
    let color = `rgb(${red},${green},${blue})`;

    // console.log(color)

    head.innerText = color;
    head.style.color = color;
    div.style.backgroundColor = color;
       
})