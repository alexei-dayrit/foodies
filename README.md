# *Foodies*

A full stack JavaScript web application for foodies who want to share and view photos of delicious food.

## Technologies Used

- React.js
- Node.js
- PostgreSQL
- Express.js
- JavaScript
- Tailwind CSS
- HTML5
- AWS S3
- Webpack
- Babel
- Dotenv
- Argon2
- Jsonwebtoken
- Multer
- Date-fns
- PGweb
- Heroku

### Live Link: https://foodies-web-app.herokuapp.com/#sign-in

## Features

- User can create a post
- User can view their posts
- User can update their posts
- User can delete their posts
- User can like a post
- User can unlike a post
- User can comment on posts
- User can view all posts
- User can sign up for an account
- User can sign into their account
- User can sign out of their account
- User can view other profiles
- User can follow a profile
## Preview

### Demo - User can login:

![Foodies login demo](assets/foodies-login-75.gif)
### Demo - User can add posts:

![Foodies add post demo](assets/foodies-add-post.gif)

## Why I built this project

I wanted my first full stack application to be about something I loved, **food**. Nowadays people document their food adventures on social media, making it much easier to learn about different cultures' cuisine. There's so much focus on food with festivals like the 626 Night Market, mukbangs, fusion restaurants, etc. The never-ending interest and creativity with food inspired me to create an app solely dedicated to sharing and enjoying food.

## Stretch Features

- User can mark location on a map
- User can search for other users
- User can edit their profile

## System Requirements

- NPM 6 or higher
- Node.js 10 or higher
## Getting Started

1. Clone the repository.

```shell
  git clone https://github.com/alexei-dayrit/final-project.git
  cd final-project
```
2. Install all dependencies with NPM

```shell
  npm install
```

3. Create an [AWS account](https://aws.amazon.com/free/) then create an IAM user for S3

    - Open IAM service while signed into AWS console
    - Click **Add users** and enter a username. The name of the app is a good idea.
    - For AWS access type, check **Access key** option for programmatic access.
    - Click **Next:Permissions**
    - Select **Attach existing policies directly**.
    - Filter policies to **AmazonS3FullAccess** and check its box.
    - Skip through the **Tags** step to **Review**
    - Create the user
    - Copy and keep your **access key id** and **secret access key** somewhere safe.
    - Done!

4. Create an S3 bucket for your uploads

    - In your home screen, click the **Create bucket** button
    - Pick a unique name for your bucket. Try something related to the app.
    - Under Object Ownership, choose **ACLs enabled** and **Bucket owner preferred**.
    -**Uncheck** the option to Block *all* public access. And leave the rest unchecked too.
    - Check the box that acknowledges public objects in the bucket.
    - Click **Create bucket** at the bottom

5. Make a copy of the provided ```.env.example``` into your own ```.env``` file. Then add your own AWS credentials as well as your database URL: ```postgres://dev:dev@localhost/foodies```

  ```shell
    cp .env.example .env
  ```

6. Start your postgreSQL service

```shell
  sudo service postgresql start
```

7. Create your database with Postgresql, then import database schema.

```shell
  createdb foodies
```

8. Import database schema.

```shell
  npm run db:import
```

9. View your database with ```pgweb``` GUI tool for PostgreQL. Can also be seen at ```http://localhost:8081``` in your browser once it's running.

```shell
  pgweb --db=foodies
```

10. Run NPM build to create main.js file

```shell
  npm run build
```

11. Start the project with **dev** script and visit application at ```http://localhost:3000``` in your browser

```shell
  npm run dev
```

12. Enjoy the app!
