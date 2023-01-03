import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimeModel } from "../models/AnimeModel";
import AnimeService from "../services/Anime.services";
import Swal from "sweetalert2";

export const AnimeList = () => {
  let navigate = useNavigate();

  //Hook: Define un atributo y la función que lo va a actualizar
  const [animes, setAnimes] = useState<Array<AnimeModel>>([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(3);
  const [input, setInput] = useState(1);

  const maximo = animes.length / porPagina;

  const opciones = [3,6,9] ; 
  //Hooks Paginacion

  const nextPage = () => {
    setInput(input + 1);
    setPagina(pagina + 1);
  };

  const previousPage = () => {
    setInput(input - 1);
    setPagina(pagina - 1);
  };

  //Hook para llamar a la Web API
  useEffect(() => {
    listAnimes();
  }, []);

  //Función que llama al Service para listar los datos desde la Web API
  const listAnimes = () => {
    AnimeService.getAnimes()
      .then((response: any) => {
        setAnimes(response.data); //Víncula el resultado del servicio con la función del Hook useState
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const removeAnime = (id: string) => {
    Swal.fire({
      title: "¿Desea eliminar el anime?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        AnimeService.deleteAnime(id)
          .then((response: any) => {
            listAnimes();
            console.log(response.data);
            navigate("/animes");
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    });
  };

  return (
    <div className="container p-4">

      <div className=" row y justify-content-center">
        <div className="card mb-3 p-3" style={{ maxWidth: "540px" }}>
          {animes &&
            animes
              .slice(
                (pagina - 1) * pagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((Anime, index) => (
                <div key={index} className="row g-0 p-3">
                  <hr />
                  <div className="col-md-4">
                    <img
                      src={Anime.frontPage}
                      className="img-fluid rounded-start"
                      alt="..."
                      height={"200px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{Anime.title}</h5>
                      <p className="card-text">{Anime.description}</p>
                      <p className="card-text">
                        <small className="text-muted">{Anime.author}</small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          {Anime.publicationDate}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="btn-group" role="group">
                    <Link
                      to={"/animes/update/" + Anime._id}
                      className="btn btn-primary"
                    >
                      <FaPen /> Editar
                    </Link>

                    <Link
                      to={"/animes/retrieve/" + Anime._id}
                      className="btn btn-warning"
                    >
                      <FaEye /> Ver
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => removeAnime(Anime._id!)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
        </div>

        <nav aria-label="..." className="row y justify-content-center">
        <ul className="pagination p-3 ">
          <li className="page-item disabled p-3">
          <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
            <span aria-hidden="true">«</span>
            <span className="sr-only">Anterior</span>
          </button>          </li>
   

          <li className="page-item active p-3">

          <p> {input} de {Math.round(maximo+0.3)} </p>
    </li>

          <li className="page-item p-3">
          <button
            disabled={
              pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)
            }
            onClick={nextPage}
          >
            <span aria-hidden="true">»</span>
            <span className="sr-only">Siguiente</span>
          </button>          </li>
        </ul>
      </nav>


      </div>
    </div>
  );
};