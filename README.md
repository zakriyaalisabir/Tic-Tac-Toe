# Tic Tac Toe
```
Building the basic tic tac toe game using react js Install nodejs in command prompt type npx create-react-app my-app to install react and create my-app folder using the following command go to my-app folder and start creating the app cd my-app npm start Reference - https://reactjs.org/tutorial/tutorial.html
```

## Features of App :
```
1. Lets you play tic-tac-toe
2. Indicates when a player has won the game
3. Stores a game’s history as a game progresses
```

## Game Flow :
```
1. The client (player) starts a game, makes a request to server to initiate a TicTakToe board ( Client (player) will always use cross )
2. The backend responds with the location URL of the started game
3. Client gets the board state from the URL
4. Client makes a move, and move is sent back to the server
5. BackEnd validates the move, makes it's own move and updates the game state. The updated game state is returned in the response
6. And so on. The game is over once the computer or the player gets 3 noughts or crosses, horizontally, vertically or diagonally or there are no moves to be made.
```

## Requirements :
```
1. Make
2. Nodejs
3. PostgreSQL
```

## Run :
<strong><i>Open Terminal and execute the following command to run game :</strong></i>
```
make all
```
