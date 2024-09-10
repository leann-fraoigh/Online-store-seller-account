import { isRouteErrorResponse, Link as RouterLink, useRouteError } from "react-router-dom";

// UI
import Link from '@mui/material/Link';

export default function ErrorPage() {
  const error = useRouteError();
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
