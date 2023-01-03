import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AnimeModel } from "../models/AnimeModel";
import AnimeService from "../services/Anime.services";
import { useNavigate, useParams } from "react-router-dom";


const AnimeForm = () => {

  const navigate = useNavigate();
  const initialState = {
    title: "",
    author: "",
    publicationDate: "",
    description: "",
    frontPage: "",
  };

  const [anime, setAnime] = useState<AnimeModel>(initialState);

  const params = useParams();

  const getVideo = async (id: string) => {
    const res = await AnimeService.getAnime(id);
    const { title, author, publicationDate, description, frontPage } = res.data;
    setAnime({ title, author, publicationDate, description, frontPage });
  };

  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, [params.id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAnime({ ...anime, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await AnimeService.createAnime(anime);
      //setAnime(initialState);
      navigate('/animes')

    } else {
      await AnimeService.updateAnime(params.id, anime);
      navigate('/animes')
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card my-auto">
          <div className="card-body">
            <h3>New Anime</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Nombre del Anime"
                  className="form-control"
                  autoFocus
                  onChange={handleInputChange}
                  value={anime.title}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="author"
                  placeholder="Autor"
                  className="form-control"
                  autoFocus
                  onChange={handleInputChange}
                  value={anime.author}
                />
              </div>

              <div className="form-group">
                <input
                  type="date"
                  name="publicationDate"
                  placeholder="Fecha de publicacion"
                  className="form-control"
                  autoFocus
                  onChange={handleInputChange}
                  value={anime.publicationDate}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Escriba una descripcion"
                  onChange={handleInputChange}
                  value={anime.description}
                ></textarea>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="frontPage"
                  placeholder="Ingrese la imagen por URL : https://"
                  className="form-control"
                  onChange={handleInputChange}
                  value={anime.frontPage}
                />
              </div>

              {params.id ? (
                <button className="btn btn-info">Actualizar</button>
                
              ) : (
                <button className="btn btn-primary">Crear</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeForm;
