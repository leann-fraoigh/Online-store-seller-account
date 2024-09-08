import { isRouteErrorResponse, Link as RouterLink, useRouteError } from "react-router-dom";

import Link from '@mui/material/Link';

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
      <p>Извините, возникла ошибка.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <p>
        <Link component={RouterLink} to="/">Вернуться на главную</Link>
      </p>
    </div>
  );
}

export default ErrorPage;