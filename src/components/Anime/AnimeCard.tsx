import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link,useParams } from 'react-router-dom';
import {AnimeModel} from "../models/AnimeModel";
import AnimeServices from "../services/Anime.services";

export const AnimeCard = () => {
  const { id }= useParams();

  const [anime, setAnime] = useState<AnimeModel>();

  useEffect(() => {
    if (id)
        getAnime(id);
  }, [id]);


  const getAnime = (id: any) => {
    AnimeServices.getAnime(id)
      .then((response: any) => {
        setAnime(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
 };

    return (
      <div>
      { 
        anime ? (
          <div>          
          <h2>{anime.title}</h2>

          <div>
        <div className="card mb-3">
          <img src={anime.frontPage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{anime.author}</h5>
            <p className="card-text">{anime.description}</p>
            <p className="card-text"><small className="text-muted">{anime.publicationDate}</small></p>
          </div>
        </div>
      </div>
    
          <br />
							<div className="btn-group" role="group">								
                <Link to={"/animes"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" className="btn btn-danger">
                  <FaTrash />Eliminar
                </button>
							</div>
          </div>

        ) : 
        ( 
          <h1>No hay un producto activo</h1>
        )
      }
      </div>
    );
}