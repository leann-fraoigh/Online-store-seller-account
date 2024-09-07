import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  console.error(error);
  let errorMessage;
  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  // } else if (error instanceof Error) {
  //   errorMessage = error.message;
  // } else if (typeof error === 'string') {
  //   errorMessage = error;
  } else {
    errorMessage = 'Неизвестная ошибка';
  }

  return (
    <div id="error-page">
      <h1>Ой...</h1>
      <p>Извините, возникла ошибка.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <Link to={`/`}>Вернуться на главную</Link>
    </div>
  );
}

export default ErrorPage;