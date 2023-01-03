import axios from 'axios';
import { AnimeModel } from '../models/AnimeModel';


const getAnimes = async () => {
    return await axios.get<AnimeModel[]>('http://localhost:4000/animes') 
}

const createAnime = async (anime : AnimeModel ) => {
    return await axios.post('http://localhost:4000/animes' , anime) 
}

const getAnime = async (id: string) => {
    return await axios.get<AnimeModel>(`http://localhost:4000/animes/${id}` );
  };

const deleteAnime = async (id: string) => {
    return await axios.delete(`http://localhost:4000/animes/${id}`);
  };
  
const updateAnime = async (id: string, anime: AnimeModel) => {
    return await axios.put(`http://localhost:4000/animes/${id}`, anime);
  };

const AnimeService = {
    getAnimes , 
    createAnime , 
    getAnime , 
    deleteAnime , 
    updateAnime

} ;

export default AnimeService ; 