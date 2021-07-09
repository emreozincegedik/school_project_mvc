import React from 'react'
import err from "../images/404.svg";

export function Error() {
  return (
    <div className="container-fluid " /* style={{ marginTop: "20vh" }} */>
        <div className="row">
        <img className="col-md-8 mx-auto" src={err} alt="" srcset="" />
        <div class="container">
          <h1 className="display-4 text-center col-sm-12">
            404 page not found
          </h1>
        </div>
      </div>
    </div>
  )
}
