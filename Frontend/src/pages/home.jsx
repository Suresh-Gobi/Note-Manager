import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/main.css";

export default function home() {
  return (
    <div className="home-background">
      <div className="container">
        <div className="home-center">
          <div className="home-title">
            <h1>Welcome to Note-Manager Version 1.0.0</h1>
            <h6>
              This web application has been designed and developed by Suresh
              Gobi for the purpose of a task at CODE FUSION TECHNOLOGY PTE. LTD
            </h6>
          </div>
          <div className="button-get">
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  {" "}
                  <Link to="/signup">
                    <button class="button-28" role="button">
                      Get Start
                    </button>
                  </Link>
                </div>
                <div class="col-sm">
                  {" "}
                  <Link to="/login">
                    <button class="button-28" role="button">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
