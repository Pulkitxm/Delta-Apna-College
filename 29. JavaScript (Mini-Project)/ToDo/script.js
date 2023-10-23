inp = document.querySelector('.inp');
submit = document.querySelector('.submit');
ul = document.querySelector('ul');

submit.addEventListener('click',()=>{
    if ( inp.value != ''){

        li = document.createElement('li')
        btn_dlt = document.createElement('button')

        btn_dlt.type = 'button'
        btn_dlt.classList.add('dlt');
        btn_dlt.innerText = 'Delete'

        btn_dlt.addEventListener('click', (event) => event.target.parentElement.remove());

        li.innerHTML = `&nbsp; ${inp.value}`
        li.prepend(btn_dlt)

        ul.appendChild(li)
        inp.value = ''


    } else{
        alert("Enter a task to add ")
    }
})