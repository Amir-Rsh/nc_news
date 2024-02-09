# NC-news

Link to deployed version: (https://nc-news-amir.netlify.app/)

This app provides the user with articles stored in the database hosted on render and allows the user to interact with the database by fetching the articles, posting comments, voting and changing the user. a default user has been set for the app as there is currently no sign in function.

this front end project was built using React JS and making use of its many features such as Router, states, params and context. Bootstrap was mainly used for the styling of the components with inline modifications. the main.css file contains an @media styling to modify some of the components for improved styling on devices with a maximum width of 600px.

the home page will navigate to </articles> where the user can observe all the articles. user will have the option to change the topic which will the navigate to a new page with the updated URL </topics/:topic>. the user will also have the option to set the sort_by and order query which will update the URL with the requested queries. to change the default user you can select change user from the nav which will navigate to </users> page where it is possible to change the logged in user (our only context in the project). user will have the option to post, upvote or downvote in the article page </articles/:article_id>

Link to back end repo: (https://github.com/Amir-Rsh/be-nc-news)

version of node used for the project: v21.2.0

To run the app locally you can take the following steps:

1. clone this repo in your desired folder by running <git clone https://github.com/Amir-Rsh/nc_news.git>
2. cd into the repo root folder <cd ./nc-news>
3. use <npm install> to install the dependencies
4. use <npm run dev> and go to the local link on your browser
