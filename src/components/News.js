import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles]= useState([]);
//   const [loading, setLoading]= useState(true);
  const [page, setPage]= useState(1);
  const [totalResults, setTotalResults]= useState(0);
  


 const updateNews= async ()=>{
    
  const url = `https://api.newscatcherapi.com/v2/latest_headlines?not_sources=prnewswire.com&lang=en&when=24h&ranked_only&countries=${props.country}&topic=${props.category}&page_size=${props.pageSize}&page=${page}`;
    props.progress(10);
    let data = await fetch(url,
      {
        method:"GET",
        headers:{
          "x-api-key": props.apiKey,
        }
      });
    props.progress(50);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    props.progress(80);
    setTotalResults(parsedData.total_hits);
    props.progress(100);
  };
  
  useEffect(()=>{
    document.title = (props.category.charAt(0).toUpperCase() + props.category.slice(1)+' - NewsMonkey');
    // eslint-disable-next-line
    updateNews()}, [])
 
  const fetchMoreData = async () => {
    const url = `https://api.newscatcherapi.com/v2/latest_headlines?not_sources=prnewswire.com&lang=en&when=24h&ranked_only&countries=${props.country}&topic=${props.category}&page_size=${props.pageSize}&page=${page+1}`;
    setPage(page+1)
    let data = await fetch(url,{
      method:"GET",
      headers:{
        "x-api-key": props.apiKey,
        "Access-Control-Allow-Origin":"*"
      }
    });
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.total_hits)
    }
    return (
      <>
        <h1 className="display-3 px-lg-5 mt-5 pt-4 my-3 position-relative w-75" style={{left:'7%'}}>Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner color={props.color}/>}
        >
            <div className="container ">
        <div className="row mx-lg-5">
          {( 
            articles.map((elem, index) => {
                return (
                  <div className="col-lg-4 my-2" key={index}>
                    <NewsItem
                      newsUrl={elem.link}
                      title={elem.title}
                      description={elem.excerpt}
                      imageUrl={elem.media}
                      author={elem.author}
                      date={elem.published_date}
                      source={elem.clean_url}
                      category={props.topic}
                      style={props.color}
                    />
                  </div>
                );
              })
          )}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
  

News.defaultProps = {
    country: "us",
    pageSize: 12,
    category: "general",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
  };
