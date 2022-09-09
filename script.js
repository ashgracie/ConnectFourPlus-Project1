/* 
Create a board
Set dimensions of the board
Player's place a token
Board needs to be able to track tokens
Determine who won or if it's a draw
Reset the game
*/


class Board{
    arr = [];
    data = {}
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data["0,0"]="Occupaied";
    }
    placeToken(token){
        this.data["-2,-1"]=token;
        // token row=2 col = 4
        if(this.data["2,3"]==undefined){
            // token row=2 col = 3
        }
        if(this.data["2,2"]==undefined){
            // token row=2 col = 2
        }
        if(this.data["2,1"]==undefined){
            // token row=2 col = 1
        }
        if(this.data["2,0"]==undefined){
            // token row=2 col = 0
        }
        for(i = 3; i > -1; i--){
            if(this.data[token.row+","+i] == undefined){
                token.col = i
            } else {
                break
            }
        }
        //data[token.location] = token

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
    constructor(row, col, player){
        this.row = row;
        this.col = col;
        this.player = player;
    }
    location(){
       return row+","+col;
    }
}
let board = new Board(7, 7);




