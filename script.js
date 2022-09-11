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
                if(this.data[token.x+","+i] == undefined){
                    token.y = i
                } else {
                    break
                }
            }
        } else if(token.x == 4){
            for(let i = 3; i > -1; i--){
                if(this.data[i + "," + token.y]== undefined){
                    token.x = i 
                } else {
                    break
                }
            }
        }else if(token.x == -4){
            for(let i = 3; i > -1; i--){
                if(this.data[-i + "," + token.y]== undefined){
                    token.x = -i 
                } else {
                    break
                }
            }
        }else if(token.y == -4){
            for(let i = 3; i > -1; i--){
                if(this.data[token.x+","+-i] == undefined){
                    token.y = -i
                } else {
                    break
                }
            }
            
        }
        if((token.x != 4 && token.x!=-4) && (token.y != 4 && token.y!=-4)){
            this.data[token.location()] = token
            document.getElementById(token.location()).classList.add("token")
        } else {
            //error message
        }
        console.log("Final location ",token, this.data)
        this.check()
    }
    check(){
        
    }

    generateHTML(){
        let boardHTML=document.querySelector("#board")
        for(let y = 4; y >= -4; y-- ){
            for(let x = -4; x <= 4; x++){
                let div = document.createElement("div");
                div.id = x+","+y
                div.innerHTML+=""+x+","+y+""
                div.classList.add("grid-item");
                if((y==4 || y==-4) && !(x==4 || x==-4) || (x==4 || x==-4) && !(y==4 || y==-4)) {
                    let button = document.createElement("button");
                    button.innerHTML="+";
                    button.addEventListener('click', function() {
                        board.placeToken(new Token(x,y))
                    });
                    div.append(button)
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
       return this.x+","+this.y;
    }
}


board = new Board(7, 7);


let token = new Token(2,4)
//board.placeToken(token);

//board.placeToken(new Token(2,4,1));

