//game variables
let gameSeq = [];
let userSeq = [];
let gameStarted = false ;
let level = 0;
let speed = 500

let h2 = document.querySelector('h2');
let range = document.querySelector('#difficulty')

range.addEventListener('change',()=>{
    if (range.value == '0') {
        speed=500
    } else if (range.value == '30') {
        speed=1000
    } else if (range.value == '60') {
        speed=100
    } 
    console.log(range.value,speed)
})

document.addEventListener('keydown',()=>{
    if (!gameStarted){
        gameStarted=true;
        console.log("Game Started")
        
        levelUp();
    }
})

document.querySelectorAll('.btn-container .btn').forEach(btn => {
    btn.addEventListener('click',(event) =>{
        if(gameStarted==false){
            gameStarted=true
            flash(event.target,'#000','#fff')
            check(userSeq.lenght-1);
        } else{
            flash(event.target,'#000','#fff')
            idx = Number(event.target.getAttribute("data-idx"));
            userSeq.push(idx)
            check(userSeq.lenght-1);
        }
    })
})

const check = (idx) =>{
    if (userSeq.length==gameSeq.length) {
        iseq=true
        for (let i=0;i<userSeq.length;i++)
            if (userSeq[i]!==gameSeq[i])
                iseq=false        
        if ( iseq ) {
            setTimeout(levelUp,speed);
            userSeq=[]
        } else {
            h2.innerHTML = `<p>Try Again! Please press any key to Start again</p><p><b>Your Score - ${(level-1)*100}</b></p>`
            gameStarted=false
            level=0
            userSeq=[]
            gameSeq=[]
            document.addEventListener('keydown',()=>{
                if (!gameStarted){
                    gameStarted=true;
                    console.log("Game Started")
                    
                    levelUp();
                }
            })
        }
    }
}

let levelUp = () =>{
    h2.innerText = `Level ${++level}`

    let randIdx = Math.floor(Math.random()*4)+1;
    gameSeq.push(randIdx)
    let btn = document.querySelector(`.btn-container .btn:nth-of-type(${randIdx})`);
    flash(btn,'#fff');
    console.log(gameSeq)

}

let flash = (btn,c1,c2='#000') => {
    setTimeout(() => {
        let bgc = btn.style.backgroundColor;
        btn.style.backgroundColor = c1;
        btn.style.color = c2;
        setTimeout(() => {
            btn.style.backgroundColor = bgc;
            btn.style.color = '#000';
        }, 100);
    }, (c1==='#000'?0:10));
}