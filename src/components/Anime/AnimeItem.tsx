import React from 'react'
import {AnimeModel} from '../models/AnimeModel'

interface Props {
    anime : AnimeModel
}
const AnimeItem = ({anime} : Props) => {
    return (
  <div className="card mb-3" style={{maxWidth: '540px'}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={anime.frontPage} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{anime.title}</h5>
              <p className="card-text">{anime.description}</p>
              <p className="card-text"><small className="text-muted">{anime.author}</small></p>
              <p className="card-text"><small className="text-muted">{anime.publicationDate}</small></p>
            </div>
          </div>
        </div>
      </div>
    );
}
export default AnimeItem ; 