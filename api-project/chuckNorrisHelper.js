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
   
    return {
      id: joke.id,
      joke: joke.value,
      url: joke.url,
      created:joke.created_at,
      category: joke.categories
    }
    
  }