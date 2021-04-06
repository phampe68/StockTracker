<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/phampe68/StockTracker">
    <img src="./assets/business-icon.png" alt="Logo" width="80" height="80" >
  </a>

  <h3 align="center">Stock Viewer</h3>

  <p align="center">
    A simple stock viewer.
    <br />
    <a href="https://github.com/phampe68/StockTracker"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/phampe68/StockTracker/issues">Report Bug</a>
    ·
    <a href="https://github.com/phampe68/StockTracker/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project (Background)

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project is a react-native app that obtains stock market data from an API and presents it through line charts. Additioanlly, stocks can be added to a watchlist that is stored on a database.

This project will demonstrate the ability to interact with an API, have a user management system, and perform basic operations on a noSQL database. Additionally, feel free to look for and use different react native libraries to help with app functionality or design. Make sure to list all libraries used in your submission.

## Design Requirements
1. The user should begin at a sign in page where they can either login or be redirected to a sign up page. User accounts can be made using an email and password. If login is successful, the user should be redirected to the home page. 
2. When the user signs up, a new account should be created using Firebase Auth's createUserWithEmailAndPassword API. Each user should have a user id, email, and password. If the sign up is successful, the user should be redirected to the home page.
3. The user should be able to navigate between a home screen where their stock watchlist is displayed, and a search screen where they can search and add stocks to the watchlist. Navigation should be done using side menu.
4. On the search screen, search results should be updated automatically as the user types. This can be done using the Alphavantage Search endpoint. Search results should appear on a flatlist.
5. Each search item should display the stock symbol and name.
6. When the user clicks on a search item, a modal should appear with a line chart that displays the monthly values of that stock over the past 6 months.
7. From the stock modal, the user should be able to add the stock to their watchlist if it's not already there. Adding to the watchlist should add an entry into a "watchlist' collection of the database with the fields 'userID' for the use that added the stock, and 'symbol' for the stock that was added.
8. On the home screen, the user should be able to view all the stocks on their watchlist. This can be implemented similarly to the search page. To get all of this user's stocks, we can filter the 'watchlist' collection for items with that match the user's userID.
9. The user should be able to remove stocks from their watchlist on the home screen. This can be done by swiping the list item which reveals a remove button.
10. The user should be able to change the line chart such that they can view stock values by day, month, or year.  


### Built With
* [React Native](https://reactnative.dev/)
* [Firebase](https://firebase.google.com/)


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```JS
   const API_KEY = 'ENTER YOUR API';
   ```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request





<!-- CONTACT -->
## Contact
Peter Pham - PeterPham@cmail.carleton.ca


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Firebase React Native Login System Tutorial](https://www.freecodecamp.org/news/react-native-firebase-tutorial/)
* [App color scheme picker](https://coolors.co/palettes/trending)
* [Alphavantage Docs](https://www.alphavantage.co/documentation/)
* [React Native Line Chart Kit](https://github.com/indiespirit/react-native-chart-kit/blob/master/src/line-chart/LineChart.tsx)
  



