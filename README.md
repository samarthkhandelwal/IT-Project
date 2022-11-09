# Workout Buddy

[Workout Buddy](https://myworkoutbuddyapp.herokuapp.com/) is an online application designed to help people find exercises and workout plans, as well as create their own workout plans. Workout Buddy is a [node.js](https://nodejs.org) project, and features [Next.js](https://nextjs.org/), [React-Bootstrap](https://react-bootstrap.github.io/), and [Firebase](https://firebase.google.com).

## Getting Started

To run a local instance of Workout Buddy, first clone this repository:

```bash
git clone https://github.com/Hu90mt990/IT-Project workoutbuddy
cd workoutbuddy
```

Ensure that [node.js](https://nodejs.org/) in installed before continuing.

Then, install the dependencies:

```bash
npm install
```

Note that any local instance that does not contain a `.env` file will not run as there is no database to connect to. Ensure that a Firebase database has been set up to run a local instance of Workout Buddy.

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the local instance running.

## Coding standards

Coding standards are kept in [docs/coding_standards.md](https://github.com/Hu90mt990/IT-Project/blob/main/docs/coding_standards.md), and are enforced through mandatory formatting and linting actions, as well as using [Husky](https://www.npmjs.com/package/husky) to ensure pre-commit linting.

## Contributors

This website was made by students studying at The University of Melbourne whilst undertaking the capstone subject for their degree: [COMP30022 - IT Project](https://handbook.unimelb.edu.au/2022/subjects/comp30022/)

- Hugo Monaco-Templeton
- Joseph Dissanayake
- Carmen Smith
- Rory Healy
- Zach Hay
