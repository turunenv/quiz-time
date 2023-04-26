# Documentation

## App description

This app allows its users to
1. Create an account
2. Create multiple choice questions with one or more correct answers
3. Answer questions from all users
4. Display stats from answered questions

## To run locally

1. Create a database with the following statements:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));

2. Add your database credentials to file database.js in folder database

3. Launch the application by navigating to the root folder of the project with your shell-program (i.e. Bash, Windows cmd)
   and entering the following command:

   deno run --allow-all --unstable run-locally.js


## To run the automated tests

To run the tests, you have to create at least one user and one question, otherwise some of the tests will fail.
Run the tests with the following command by replacing the credentials with the ones you created (this way of passing env variables to the program has only been tested on Bash, so be aware):

EMAIL=replaceThisWithEmail PASSWORD=replaceThisWithPassword deno test --allow-all --unstable

## Find the app online

https://quiz-time.fly.dev/




