# 🎓 TOEIC Quiz Platform Documentation 🎓

## Introduction 📄

The **TOEIC Quiz Platform** is a modern web application designed to help users prepare for the TOEIC exam. This platform offers interactive quiz features, personalized question sets, and progress tracking to ensure an engaging and productive learning experience.

## Features 🚀

### 🔐 Authentication

- Secure login and registration system.
- Password encryption for user security.
- Integration with social login options (e.g., Google, Facebook, Twitter).

### 📚 Quiz System

- Dynamic Question Generation: Ensures each quiz attempt is unique.
- Feedback: Immediate feedback on submitted answers.
- Time Tracking: Keeps track of quiz completion times for performance analysis.

### 📊 Progress Tracking

- Historical data for each quiz attempt.
- Statistical insights on strengths and weaknesses.

## Prerequisites 📋

Before you can run the HUTECH Bug, you need to have the following installed:

- Node.js
- MongoDB
- Yarn

## Installation 🔧

Follow these steps to get your development environment running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ngcuyen/toeic-quiz-be.git
   cd toeic-quiz-be
   ```

2. **Install the dependencies:**

   ```bash
   yarn install
   ```

3. **Create a `.env` file in the root directory**

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

- **Question**

  - `GET /api/v1/questions` - Get all questions
  - `POST /api/v1/questions` - Create a new question (Authenticated users only)
  - `GET /api/v1/questions/:id` - Get a single question by ID

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

<!-- Example contributor table with images and links to GitHub profiles -->
<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/ngcuyen"><img src="https://avatars.githubusercontent.com/ngcuyen" width="100px;" alt="Lê Phạm Ngọc Uyển"/><br /><sub><b>Lê Phạm Ngọc Uyển</b></sub></a><br /><a href="https://github.com/yourusername/hutech-bug-api" title="Code">💻</a></td>
  </tr>
</table>
