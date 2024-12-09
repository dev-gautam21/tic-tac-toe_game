let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newgame");
let msg = document.getElementById("msg");
let msg_container = document.querySelector(".msg-container");
let turnO = true;
let counter = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    turnO = true;
    counter = 0;
    enableBoxes();
    msg.innerText = "";
    msg_container.classList.add("hide");
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled= false;
        box.innerText="";
    }
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled= true;
    }
};

const showWinner = (winner) => {
        msg.innerText = ` PLAYER ${winner}  WON!`;
        msg_container.classList.remove("hide");
        disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return;
            }
        }
    }
        if(counter === 9){
            msg.innerText = "IT'S A TIE!";
            msg_container.classList.remove("hide");
            disableBoxes();
        }
};

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText="O";
            turnO = false;
        }
        else{
            box.innerText="X";
            turnO = true;
        }
        box.disabled = true;
        counter++;
        checkWinner();
    })
});

reset.addEventListener("click",resetGame);
newGame.addEventListener("click",resetGame);
