const playstore = require('./playstore.js');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('combined'));


let resultList = [...playstore];

app.get('/apps', (req,res) => {
  const { sort, genres } = req.query;
  if(sort === 'Rating') {
    resultList.sort((a, b) => 
      a[sort] > b[sort] ? -1 : 1);
  } else if(sort === 'App') {
    resultList.sort((a, b) => a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1)
  } else if (sort) {
    res.status(400).send('Please provide a sort value in Proper format');
    return;
  }
  
  //genre optional, filter by given
  const genreList = ['Action','Puzzle','Strategy','Casual','Arcade','Card'];
  
  if(genres && genreList.includes(genres)) {
    resultList = resultList.filter(app=>app.Genres===genres);
  } else if (genres) {
    res.status(400).send('Please provide a genre value in Proper format');
    return;
  }

  res.json(resultList);
});

module.exports = app;