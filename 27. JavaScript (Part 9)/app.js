body = document.querySelector('body')
btn = document.createElement('button')
inp= document.createElement('input')

btn.innerText = 'click me'
btn.type = 'button'
btn.id = 'btn'
inp.placeholder = 'username'

body.append(inp)
body.append(btn)

button = document.querySelector('#btn')
button.style.color = 'white'
button.style.backgroundColor = 'blue'

h1 = document.createElement('h1');
h1.innerHTML= '<u>DOM Practise</u>';
body.append(h1);

h1=document.createElement("h1");
h1.innerHTML="<u>DOMPractice</u>";
document.querySelector("body").append(h1);