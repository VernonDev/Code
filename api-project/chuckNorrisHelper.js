// jokeHelper.js
// Helper: Format joke response
export const formatJokeResponse = (joke) => {
    return {
      id: joke.id,
      joke: joke.value,
      url: joke.url
    };
  };
  
 
  export const formatRandomResponse = (joke) => {
    console.log(joke.catergories)
    return {
      id: joke.id,
      joke: joke.value,
      url: joke.url,
      category:joke.catergories
    }
    
  }