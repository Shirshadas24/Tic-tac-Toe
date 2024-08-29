let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newBtn=document.querySelector("#new");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;

const winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO) {
            box.innerText="O";
            turnO=false;
        } else {
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkwinner();
    })
})

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#957fef', '#fe7f2d', '#28A745', '#8338ec', '#ff006e', '#e27396'];
    
    for (let i = 0; i < 100; i++) { // Generate 100 confetti pieces
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2s to 5s
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}

const disabled=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enabled=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}


const showWinner=(winner)=>{
    msg.innerText=`Winner ${winner}`;
    msgContainer.classList.remove("hide");
    disabled();
    createConfetti();

}
const checkwinner=()=>{
    let winnerFound = false;
    for(pattern of winpatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if (pos1val!="" && pos2val!="" && pos3val!="") {
            if (pos1val==pos2val && pos2val==pos3val) {
                console.log("winner",pos1val);
                boxes[pattern[0]].style.backgroundColor ="#fb8500";
                boxes[pattern[1]].style.backgroundColor ="#fb8500";
                boxes[pattern[2]].style.backgroundColor ="#fb8500";
                showWinner(pos1val);
                winnerFound = true;
                break;
            }
        }
    }
    if (!winnerFound && checkDraw()) {
        showDraw();
    }
}

const checkDraw = () => {
    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    return isDraw;
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disabled();
};

const reset=()=>{
    turnO=true;
    enabled();
    msgContainer.classList.add("hide");
    boxes.forEach(box => {
        box.style.backgroundColor = ""; // Reset the background color of the boxes
    });
    const confettiContainer = document.getElementById('confetti-container');
    while (confettiContainer.firstChild) {
        confettiContainer.removeChild(confettiContainer.firstChild);
    }
}
resetBtn.addEventListener("click",reset);
newBtn.addEventListener("click",reset);