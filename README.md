# NextNotes

An Application where users can login/signin and write anything as a note, and access it later.
It is made it in a way where anyone can access their notes without using browser client, and can also send request via postman, hopescotch or any other client.

## Demo

https://github.com/user-attachments/assets/faade544-b1a3-4334-8459-a52761be4e3c

## Features

- User authentication (Login/Signup).
- Create, read, update, and delete (CRUD) notes.
- Accessible via browser and API clients.
- Real-time form validation using `react-hook-form` and `zod`.
- Rate-limiting for API endpoints using `rate-limiter-flexible`.
- Responsive design powered by `tailwindcss`.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: Supports relational databases (e.g., PostgreSQL)
- **Authentication**: NextAuth.js
- **Validation**: Zod, @hookform/resolvers
- **Email Service**: Nodemailer, Resend
- **Other Utilities**:
  - Axios for API requests
  - React Hot Toast for notifications
  - Recoil for state management

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/next-notes.git
   cd next-notes
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   --env.example file

4. Apply database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for linting errors.

## Development Dependencies

- **TypeScript**: Statically typed JavaScript.
- **ESLint**: Linting tool for code quality.
- **Prettier**: Code formatter.
- **Prisma CLI**: Database migrations and management.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to open issues or submit pull requests if you encounter any bugs or have feature requests!
