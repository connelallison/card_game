This is a very simple implementation of an online card game, roughly along the lines of Hearthstone. It was created as my final project at the end of CodeClan, a 16 week coding course. It is written in JavaScript and makes use of (most notably) React, Express, and Socket.io.

The game logic is located entirely on the server, which provides the client with only the information it needs to display the game state to the player and acknowledge only valid instructions. This version does not yet have a way implemented for the client to communicate the instructions to the server, however, so instead the client can request a test game from the server - the server will start a game between two very simple bots, and the user can watch the game in the client.

This branch is the version of the game that I presented as my final project while at CodeClan. It is the (very raw) product of two and a half days of work. I am preserving this branch so that the project can be viewed as it was then, regardless of any further work I do on it - hopefully there will eventually be quite a stark contrast.

To set up and view the game:

1. Open 2 terminal tabs.
2. In one tab, navigate to the server directory.
3. Run "npm install" inside the server directory to install the server's packages.
4. Run "npm start" inside the server directory.
5. In the other tab, navigate to the client directory.
6. Run "npm install" inside the client directory to install the client's packages.
7. Run "npm start" inside the client directory.
8. This should automatically open the game for you, but if it does not, use a web browser and go to "http://localhost:3000/".
9. If you like, you may open multiple tabs at this address - each will be treated by the server as a separate client, and you can see a different game in each tab.
10. If you would like to connect to the game from another device in your network, check the terminal tab where the client is running - it should provide the required address.
