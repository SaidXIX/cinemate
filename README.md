# Cinemate

A React application that allows users to keep track of movies, Tv Shows and browse through the latest trends

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To install and run this project locally, follow these steps:
1. Clone the repository to your local machine using the following command:
   ```bash
   git clone https://github.com/SaidXIX/cinemate.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cinemate
   ```
3. Then you need to generate the **TMDB** Api key and Access Token through this link: [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) , then create a **.env** file with the following variables
   ```bash
   VITE_URL_TMDB_API_KEY='your generated api key'
   VITE_URL_TMDB_API_ACCESS_TOKEN='your generated access token'
   ```

4. Install the dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

Once the dependencies are installed, you can run the project locally using the following command:

```bash
npm run dev
```

This will start the development server and open the project in your default web browser. You can view the project at [http://localhost:5173](http://localhost:5173).
