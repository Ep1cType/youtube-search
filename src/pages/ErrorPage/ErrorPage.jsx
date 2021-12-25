import React from "react";

import s from './ErrorPage.module.scss';
import {useSearchParams} from "react-router-dom";
import {useLocation} from "react-router";

const ErrorPage = () => {
  const location = useLocation();

  if(!location.state) {
    return (
      <div>
        Эта страница недоступна.
        Может, поискать что-нибудь другое?
      </div>
    )
  }

  return (
    <div>
      {location.state && <span>{location.state}</span>}
    </div>
  );
};

export default ErrorPage;
