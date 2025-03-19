# HUTECH Bug 🐛

## Overview 📄

Welcome to the HUTECH Bug project! 🎉 The "HUTECH Bug" is an interactive platform designed to help students at HUTECH University troubleshoot and resolve common programming errors encountered during their practical exercises. Students can quickly look up errors by keywords or error messages, contribute their solutions, vote on the effectiveness of existing solutions, and discuss issues with peers to enhance understanding and collaborative learning.

## Features 🚀

- **Error Lookup** 🔍: Quickly find fixes to common errors by searching with error messages or keywords.
- **Solution Voting** 🗳️: Vote on solutions that work best to ensure the highest quality fixes are most visible.
- **Contribute Solutions** ✍️: Add new solutions and share your knowledge with other students.

## Technologies 💻

- **Back-End:** Node.js, TypeScript, and MongoDB for API development and data management.
- **Authentication:** Implement secure login and user authentication with JWT (JsonWebToken).

## Prerequisites 📋

Before you can run the HUTECH Bug, you need to have the following installed:
- Node.js
- MongoDB
- Yarn

## Installation 🔧

Follow these steps to get your development environment running:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Newbies-Coder/hutech-bug-api.git
   cd hutech-bug-api
   ```

2. **Install the dependencies:**
   ```bash
   yarn install
   ```

3. **Create a `.env` file in the root directory and add your MongoDB URI and other environment variables:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/bug-management
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server:**
   ```bash
   yarn dev
   ```

## Usage 🌐

Once the application is running, navigate to `http://localhost:8080` in your web browser to start using the HUTECH Bug.

## API Endpoints 📡

Here are some of the key API endpoints included in this project:

- **User Authentication**
  - `POST /api/v1/auth/register` - Register a new user
  - `POST /api/v1/auth/login` - Authenticate a user

- **Bugs**
  - `GET /api/v1/bugs` - Get all bugs
  - `POST /api/v1/bugs` - Create a new bug (Authenticated users only)
  - `GET /api/v1/bugs/:id` - Get a single bug by ID

- **Comments**
  - `POST /api/v1/comments` - Create a new comment (Authenticated users only)
  - `GET /api/v1/comments/bug/:bugId` - Get all comments for a bug

### Example Request 📝

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
-H 'Content-Type: application/json' \
-d '{"email":"testuser@gmail.com","password":"password"}'
```

## Contributing 🤝

We encourage contributions from all students! If you have a fix for an error not yet listed in the database, or improvements to existing fixes, please feel free to contribute. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/add-new-fix`).
3. Commit your changes (`git commit -am 'Add new fix'`).
4. Push to the branch (`git push origin feature/add-new-fix`).
5. Create a new Pull Request.

Please ensure your code adheres to the project's coding standards and include tests for new features or fixes.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors 👥

HUTECH Bugs API is a training project and is developed by contributions from the following members:

<!-- Example contributor table with images and links to GitHub profiles -->
<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/qoucname2202"><img src="https://avatars.githubusercontent.com/qoucname2202" width="100px;" alt="Dương Quốc Nam"/><br /><sub><b>Dương Quốc Nam</b></sub></a><br /><a href="https://github.com/yourusername/hutech-bug-api" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ngcuyen"><img src="https://avatars.githubusercontent.com/ngcuyen" width="100px;" alt="Lê Phạm Ngọc Uyển"/><br /><sub><b>Lê Phạm Ngọc Uyển</b></sub></a><br /><a href="https://github.com/yourusername/hutech-bug-api" title="Code">💻</a></td>
  </tr>
</table>
