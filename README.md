### Prerequisite

1. Check ng version
   ```
   ng version
   Angular CLI: 15.2.5
   ```
2. Check node version
   ```
   node -v
   v18.10.0
   ```
3. Check npm version
   ```
   npm -v
   8.19.2
   ```
4. Java version (Java 17 or above is required)

### Installation Steps

1. Clone this repo
   ```
   git clone https://github.com/mademanik/book-manager-hubexo.git
   ```

#### Running Springboot Backend Server
2. cd into book-manager-backend
   ```
   cd book-manager-backend
   ```
3. run command below
   ```
   mvnw.cmd spring-boot:run
   ```
4. running server done

#### Running Angular Frontend Client
5. run ng version to check if angular cli@15.2.5 has installed or not
   ```
   ng version
   ```
6. if angular cli not installed, then running below command to install
   ```
   npm install -g @angular/cli@15.2.5
   ```
7. cd into book-manager-frontend
   ```
   cd book-manager-frontend
   ```
8. run npm install or yarn to download package dependency
   ```
   npm i
   ```
9. run npm start to run angular client frontend
   ```
   npm start
   ```
10. open to port http://localhost:4200 on browser to open angular web page
11. running client done