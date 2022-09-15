/* 
Create a board
Set dimensions of the board
Player's place a token
Board needs to be able to track tokens
Determine who won or if it's a draw
Reset the game
*/

let board

class Board{
    data = {}
    currentPlayer = 1;
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        // this.data["0,0"]="Occupied";
        this.generateHTML()
    }
    placeToken(token){
        console.log("Place token ",token)
        if(token.y == 4){
            for(let i = 3; i > -1; i--){
                if(this.data[loc(token.x,i)] == undefined){
                    token.y = i
                } else {
                    break
                }
            }
        } else if(token.x == 4){
            for(let i = 3; i > -1; i--){
                if(this.data[loc(i,token.y)]== undefined){
                    token.x = i 
                } else {
                    break
                }
            }
        }else if(token.x == -4){
            for(let i = 3; i > -1; i--){
                if(this.data[loc(-i,token.y)]== undefined){
                    token.x = -i 
                } else {
                    break
                }
            }
        }else if(token.y == -4){
            for(let i = 3; i > -1; i--){
                if(this.data[loc(token.x,-i)] == undefined){
                    token.y = -i
                } else {
                    break
                }
            }
            
        }
        if((token.x != 4 && token.x!=-4) && (token.y != 4 && token.y!=-4)){
            token.player = this.currentPlayer
            this.data[token.location()] = token
            this.check(token)

            
            
            document.getElementById(token.location()).classList.add("token"+this.currentPlayer)
            document.getElementById(token.location()).innerHTML = this.currentPlayer==1 ? "❌":"⭕️"

            if(this.currentPlayer == 1){
                this.currentPlayer = 2
            } else if(this.currentPlayer == 2) {
                this.currentPlayer = 1
            }
            document.querySelectorAll(".grid-item button").forEach((button)=>{
                button.innerHTML= this.currentPlayer==1 ? "❌":"⭕️"
            })
        } else {
            //error message
        }
        console.log("Final location ",token, this.data)
    }
    check(token){
        let breakers = [false,false,false,false,false,false,false,false];
        let counters = [0,0,0,0,0,0,0,0];
        for(let s=1; s<=4; s++){
            let locations = [];
            locations.push(loc(token.x + s,token.y))
            locations.push(loc(token.x - s,token.y))
            locations.push(loc(token.x,token.y + s))
            locations.push(loc(token.x,token.y - s))
            locations.push(loc(token.x + s,token.y + s))
            locations.push(loc(token.x - s,token.y - s))
            locations.push(loc(token.x - s,token.y + s))
            locations.push(loc(token.x + s,token.y - s))
            locations.forEach((loc,idx)=>{
                if(breakers[idx]){return}
                if(this.data[loc]==undefined || this.data[loc].player!=token.player){
                    breakers[idx] = true;
                } else {
                    counters[idx]++;
                }
            })
            console.log(locations)
            console.log(counters)
        }
        console.log(counters)
        if(counters[0]+counters[1]>=3 || counters[2]+counters[3]>=3 || counters[4]+counters[5]>=3 || counters[6]+counters[7]>=3) {
            this.gameOver()
        }

    }
    newGame(){
        this.currentPlayer = 1
        document.querySelectorAll(".token-button").forEach((button)=>{
            button.disabled=false;
            button.innerHTML = "❌"
        })
        document.querySelectorAll(".space").forEach((space)=>{
            space.innerHTML = ""
            space.classList.remove("token1")
            space.classList.remove("token2")
        })


        this.data={}
    }
    gameOver(){
        document.querySelectorAll(".grid-item button").forEach((button)=>{
            button.disabled=true;
        })
        alert("Player "+this.currentPlayer+" won!")
        this.newGame()
    }
    generateHTML(){
        let boardHTML=document.querySelector("#board")
        for(let y = 4; y >= -4; y-- ){
            for(let x = -4; x <= 4; x++){
                let div = document.createElement("div");
                div.id = loc(x,y)
                // div.innerHTML+=loc(x,y)
                div.classList.add("grid-item");
                if((y==4 || y==-4) && !(x==4 || x==-4) || (x==4 || x==-4) && !(y==4 || y==-4)) {
                    let button = document.createElement("button");
                    div.classList.add("token-button-holder");
                    button.classList.add("token-button");
                    button.innerHTML="⭕️";
                    button.innerHTML="❌";
                    button.addEventListener('click', function() {
                        board.placeToken(new Token(x,y))
                    });
                    div.append(button)
                } else if(!((y==4 && x==4) || (y==-4 && x==4) || (y==4 && x==-4) || (y==-4 && x==-4) )) {
                    div.classList.add("space");
                }

                
                boardHTML.append(div)
            }
        }
    }
} 
/*
                      (2,4)
    v   v   v   v   v   v   v
  > -   -   -   -   -   -   - < 
  > -   -   -   -   -   -   - < 
  > -   -   -   -   -   -   - < 
  > -   -   -   x   -   -   - < 
  > -   -   -   -   -   -   - < 
  > -   -   -   -   -   -   - < (4,-2)
  > -   -   -   -   -   -   - < 
    ^   ^   ^   ^   ^   ^   ^
 (-3,-4)
    
*/


class Token{
    constructor(x, y, player){
        this.x = x;
        this.y = y;
        this.player = player;
    }
    location(){
       return loc(this.x,this.y)
    }
}
function loc(x,y) {
    return x+","+y;
}


board = new Board(7, 7);


let token = new Token(2,4)
//board.placeToken(token);

//board.placeToken(new Token(2,4,1));

document.querySelector("#restart").addEventListener("click", ()=>{board.newGame()})
let modalDIV = document.querySelector("#modal")
document.querySelector("#modal-button").addEventListener("click",()=>{
    modalDIV.style.display="flex"
})
modalDIV.addEventListener("click", ()=>{
    modalDIV.style.display="none"
})