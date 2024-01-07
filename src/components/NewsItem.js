import React from "react";

export default function NewsItem(props) {
            
   
    return (
      <div className="card-group h-100">
        <div className="card " style={{backgroundColor: 'lightyellow'}}>
          <span
            className={'position-absolute badge text-bg-'+props.style}
            style={{ left: "0%", top: "0%" }}
          >
            {props.source}
          </span>

          <img src={props.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text">
              <small >
                <a
                  href={props.newsUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="btn btn-dark btn-sm"
                >
                  Read More
                </a>
              </small>
            </p>
          </div>
          <div className="card-footer text-center">
            <small className="text-muted">
              Published by {props.author ? props.author : "(unknown)"} on {new Date(props.date).toGMTString()}
            </small>
          </div>
        </div>
      </div>
    );
  }

