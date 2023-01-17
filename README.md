# Dice Factor

### Hosted site

To view the live version, please visit:

> https://captainread.github.io/dice-factor/

## Project summary

This full-stack project was developed as part of my Northcoders bootcamp course.

My project's JS(X) front-end was created in one week using [React](https://reactjs.org/). Various [Material UI](https://mui.com/) components have been employed for styling.

Calls are made to my own [back-end API](https://github.com/captainread/be-nc-games) which was developed using [PSQL](https://www.postgresql.org/) and [node-postgres](https://node-postgres.com/).

## Site summary

Dice Factor is a mock-up of a board game rating, review and discussion site.

The homepage loads a list of all reviews, with optional sorting functionality, and links to individual reviews.

Individual review detail pages provide users the ability to up/downvote submitted reviews and to add comments. Reviews can also be browsed by game categories.

Due to the short timeframe for this project, some features are missing or represented with placeholders - such as comment voting, user log-in, review posting.

I employed mobile-first design principles, and the site is best viewed on mobile.

---

## Local instructions

### Requirements

Minimum versions of `Node.js` needed to run the project:

- **node.js**: v18.10.0

### Set-up

In order to run this project locally, please follow the instructions below.

1. Clone the repository from GitHub:

```shell
$ git clone https://github.com/captainread/fe-nc-games.git
```

2. Navigate to / open the repo.

3. To install dependencies, run this command:

```shell
$ npm install
```

4. To view a local preview of the site, run

```shell
$ npm start
```
