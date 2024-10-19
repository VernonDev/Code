/*export const formatDisneyCharacter = (character) =>{
    return {
        id: character._id,
        films: character.films | [],
        source: character.sourceUrl

    }
}
*/

// Helper function to format the Disney API response
export const formatDisneyCharacter = (apiResponse) => {
    const { info, data } = apiResponse;
  
    // Format the pagination info
    const formattedInfo = {
      totalItems: info.count,
      totalPages: info.totalPages,
      previousPage: info.previousPage,
      nextPage: info.nextPage,
    };
    
    // Format each character's data
    const formattedCharacters = data.map(character => {
      return {
        id: character._id,
        name: character.name,
        films: character.films.length > 0 ? character.films.join(', ') : 'No films',
        tvShows: character.tvShows.length > 0 ? character.tvShows.join(', ') : 'No TV shows',
        videoGames: character.videoGames.length > 0 ? character.videoGames.join(', ') : 'No video games',
        imageUrl: character.imageUrl,
        characterUrl: character.url,
        sourceUrl: character.sourceUrl,
      };
    });
  
    // Combine both formatted parts
    return {
      pagination: formattedInfo,
      characters: formattedCharacters,
    };
  };
  