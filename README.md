# UniRide

UniRide is a ride-sharing platform designed specifically for university students, faculty, and staff to facilitate easy and convenient transportation within the campus community.

## Table of Contents

- [Features](##features)
- [Installation](##installation)
- [Usage](##usage)
- [Contributing](##contributing)
- [License](##license)

## Features

- **User Authentication**: Secure login and registration system tailored for university members.
- **Ride Booking**: Easily book rides within the university campus.
- **Driver Services**: Enable students to offer driving services to others within the university community.
- **Rating System**: Rate and review drivers to maintain service quality.
- **Notifications**: Receive real-time notifications for ride requests, confirmations, and updates.
- **Admin Dashboard**: Manage users, drivers, and rides efficiently.

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
 ```

3. Set up environment variables:

- Create a .env file in the root directory.
- Add necessary environment variables like database credentials and API keys.
  
4. Run the application:

```bash
npm run dev
```

```bash
node app.js
```

5. Access UniRide at http://localhost:3000 in your browser.

## Usage

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

## Contributing
We welcome contributions to UniRide to improve functionality and user experience. To contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature/awesome-feature).
- Implement your changes and ensure code quality.
- Commit your changes (git commit -am 'Add awesome feature').
- Push to the branch (git push origin feature/awesome-feature).
- Create a new Pull Request.

Please adhere to the project's coding style and conventions when submitting code.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
