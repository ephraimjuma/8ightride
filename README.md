
![git](	https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

![npm](	https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![Express](	https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![VsCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)

![](https://img.shields.io/github/issues/{ephraimjuma}/{UniRide}.svg)

![](	https://img.shields.io/github/license/{ephraimjuma}/{UniRide}.svg)

![](	https://img.shields.io/github/release/{ephraimjuma}/{UniRide}.svg)

![](	https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)


# UniRide

UniRide is a ride-sharing platform designed specifically for university students, faculty, and staff to facilitate easy and convenient transportation within the campus community.


## Table of Contents

- [Features](#features)
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Getting Started](#GettingStarted)
- [Directory Structure](#DirectoryStructure)
- [Technologies Used](#TechnologiesUsed)
- [Usage](#Usage)
- [Configuration](#Configuration)
- [Common Issues](#CommonIssues)
- [Contributing](#Contributing)
- [License](#License)
- [Contact Information](#ContactInformation)
- [Acknowledgements](#Acknowledgements)
- [FAQ](#FAQ)
- [Authors](#Authors)
## Features

- **User Authentication**: Secure login and registration system tailored for university members.
- **Ride Booking**: Easily book rides within the university campus.
- **Driver Services**: Enable students to offer driving services to others within the university community.
- **Rating System**: Rate and review drivers to maintain service quality.
- **Notifications**: Receive real-time notifications for ride requests, confirmations, and updates.
- **Admin Dashboard**: Manage users, drivers, and rides efficiently.

## Prerequisites 

- [Node.js](https://nodejs.org/en/download/package-manager/current)
- [npm](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [MySQL](https://www.mysql.com/)
## Installation

To run UniRide locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your/repository.git
   cd repository-folder
   ```

2. Install dependancies:

   ```bash
   npm install -g npm
   npm install
   ```

3. Set up environment variables:

- Create a .env file in the root directory.
- Add necessary environment variables like database credentials and API keys.
  
4. Run the application:

  ```bash
  node app.js
  ```
5. Access UniRide at http://localhost:3000 in your browser.
    
## Getting Started

Follow the installation steps above to get started. Ensure you have the required prerequisites installed on your system.
## Directory Structure

UniRide/

├── node_modules/      
├── public/             
├── src/                
│   ├── controllers/    
│   ├── models/         
│   ├── routes/         
│   └── views/          
├── .env                
├── package.json        
├── README.md           
└── app.js              


## Technologies Used

- [Node.js](https://nodejs.org/en/download/package-manager/current)
- [Express.js](https://expressjs.com/en/starter/installing.html)
- [MySQL](https://www.mysql.com/)
- [EJS](https://ejs.co/)
- [Socket.io](https://socket.io/get-started/chat)
- [Daraja API](https://developer.safaricom.co.ke/APIs)
## Usage/Examples

A brief overview of the project's directory structure:

### User Registration
Students can register using their university email addresses.
Drivers must undergo verification by the admin to ensure reliability.

### Booking a Ride
Students can select pickup and drop-off locations within campus or nearby areas.
Available drivers are displayed with details such as ratings and vehicle information.
Users can book rides based on their preferences and schedule.

### Driver Operations
Drivers receive ride requests and can choose to accept or decline based on availability.
Once accepted, drivers can navigate to the pickup location and complete the ride after drop-off.

### Admin Dashboard
Administrators have access to tools for managing user accounts, verifying drivers, and viewing ride statistics.
Admins can monitor feedback and ratings to maintain service quality.

## Configuration

Create a .env file in the root directory and add the following variables:

```bash
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name
```

## Common Issues

- Database Connection Error: Ensure your database credentials in the .env file are correct.
- Port in Use: If port 3000 is already in use, specify a different port in your .env file.

## Deployment

To deploy UniRide to a production environment, follow these steps:

1. Set up a production database.
2. Set the environment variables for the production database in your server.
3. Run the application in production mode:
   
   ```bash
   npm run start
   ```


## Contributing

We welcome contributions to UniRide to improve functionality and user experience. To contribute:

- Fork the repository.
- Create a new branch
  ```bash
  git checkout -b feature/awesome-feature
  ```
- Implement your changes and ensure code quality.
- Commit your changes
    ```bash
    git commit -am 'Add awesome feature'
    ```
- Push to the branch
    ```bash
    git push origin feature/awesome-feature
    ```
- Create a new Pull Request.

Please adhere to the project's coding style and conventions when submitting code.

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback, please reach out to us [Here](ephraimloch@gmail.com)


## Acknowledgements

Special thanks to all contributors and the open-source community.


## FAQ

#### How do I reset my password?

Go to the login page and click "Forgot Password"

#### How do I become a driver?

Register as a driver and wait for admin verification. Avail the required documents.


## Authors

- [@ephraimjuma](https://github.com/ephraimjuma)

- [@Misati1](https://github.com/Misati1)

