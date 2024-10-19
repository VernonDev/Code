import { fetchCharacter } from '../connectors/disneyConnector.js';
import { formatDisneyCharacter } from '../helpers/disneyHelper.js';


export const getDisneyHandler = async (req,res) =>{
    try{
        const character = await fetchCharacter();
        const formattedCharacter = formatDisneyCharacter(character);
        res.status(200).json(formattedCharacter);

    } catch (error){
        res.status(500).json({ message: 'Failed to fetch characher', error });
    }
}