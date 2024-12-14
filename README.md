# Role-Based Access Control (RBAC) System

This document outlines the development of a basic RBAC system in a Node.js application using Express.js. The system will manage user roles and restrict access to certain routes based on those roles.

**Requirements**

**1. Setup**

* Initialize a new Node.js project with Express.js.
* Install necessary dependencies:
    * express
    * jsonwebtoken (JWT)
    * bcryptjs

**2. Define Roles and Permissions**

* Create three roles: Admin, User, and Guest.
* Assign permissions as follows:
    * Admin: Access all routes.
    * User: Access user-specific routes.
    * Guest: Access public routes.

**3. User Authentication**

* Implement user registration and login endpoints.
* Use JWT (JSON Web Tokens) for authentication.
* Include the user's role in the token.

**4. Role-Based Authorization**

* Create middleware to enforce role-based access control.
* Implement three routes:
    * Public Route (/public): Accessible by everyone.
    * User Route (/user): Accessible by User and Admin roles.
    * Admin Route (/admin): Accessible only by the Admin role.

**5. Error Handling**

* Handle unauthorized access with HTTP status codes:
    * 401 Unauthorized for invalid or missing tokens.
    * 403 Forbidden for insufficient permissions.

**6. Logging**

* Log each request to the protected routes, including user role and access status.

**Bonus**

* Implement a feature to update user roles.
* Add input validation and sanitation for the registration and login endpoints.

**Getting Started**

1. Clone this repository.
2. Install the required dependencies:

```bash
npm install express jsonwebtoken bcryptjs
```

3. Run the application:

```bash
node app.js
```

**API Reference**


* **POST /auth/register**
    * Create a new user account.
    * Request body:
        * username (string)
        * password (string)
        * role (string)
* **POST /auth/login**
    * Login a user and obtain a JWT.
    * Request body:
        * username (string)
        * password (string)
* **(protected) GET /protected/user**
    * Retrieve user information.
    * Requires User or Admin role.
* **(protected)  GET /protected/admin**
    * Access admin-specific data.
    * Requires Admin role only.

**Additional Notes**

* This is a basic implementation of RBAC and can be extended to include more complex permission schemes.
* Remember to implement proper security measures to protect user data and tokens.
