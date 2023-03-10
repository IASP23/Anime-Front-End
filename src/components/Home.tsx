import logo from '../logo.svg';

type AppProps = {
    title : string;
    description: string;
  }

export const Home = (props: AppProps) => {
    return (
        <div className="text-center">
          <img src={"https://www.farodeoriente.com/wp-content/uploads/2019/10/Mejores-animes.jpg"} className="d-block mx-auto mb-4" height="500" alt="logo"/>
          <h1 className='display-5 fw-bold'>{props.title}</h1>
          <div className='col-lg-6 mx-auto'>
            <p className='lead mb-4'>
              {props.description}
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
             {/*  <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
              <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button> */}
            </div>
          </div>
        </div>
      );
}