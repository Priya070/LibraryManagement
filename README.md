# Library management
- First clone the project using following command
    ```bash
    git clone https://github.com/Priya070/Library_management.git
    ``` 

- Now install packages by following cmd

     - Install pacakages in backend folder
        ```bash
        cd backend
        npm install
        ```
    - Install packages in client(frontend) folder
        ```bash
        cd ..
        cd client
        npm install
        ```

- Now make .env file where you need to add JWT_SECRET, PORT,MONGODB_URI


- To start  server follow these commands:-
    - backend server
        ```bash
        cd backend
        node index.js
        ```
    -   Run new terminal for frontend server by following cmds:-
        ```bash
        cd client
        npm start
        ```

