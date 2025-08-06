import React, { useEffect, useState, useCallback } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import throttle from 'lodash/throttle';
import { Heading, Text, Box } from '@chakra-ui/react';
import { useTheme } from '../contexts/ThemeContext';

export default function News(props) {
  const { theme } = useTheme();
  const [articles, setArticles]= useState([]);
//   const [loading, setLoading]= useState(true);
  const [page, setPage]= useState(1);
  const [totalResults, setTotalResults]= useState(0);
  const [hasMore, setHasMore]= useState(true);
  


 const updateNews= async ()=>{
    
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&page=${page}&apiKey=${props.apiKey}`;
    props.progress(10);
    let data = await fetch(url);
    props.progress(50);
    let parsedData = await data.json();
    console.log('Initial API response:', parsedData);
    setArticles(parsedData.articles || []);
    props.progress(80);
    setTotalResults(parsedData.totalResults || 0);
    props.progress(100);
  };
  
  useEffect(()=>{
    document.title = (props.category.charAt(0).toUpperCase() + props.category.slice(1)+' - NewsMonkey');
    // eslint-disable-next-line
    updateNews()}, [])
 
  // const fetchMoreData = useCallback(throttle(async () => {
  //   const url = `https://api.newscatcherapi.com/v2/latest_headlines?not_sources=prnewswire.com&lang=en&when=24h&ranked_only&countries=${props.country}&topic=${props.category}&page_size=${props.pageSize}&page=${page+1}`;
  //   setPage(page+1)
  //   let data = await fetch(url,{
  //     method:"GET",
  //     headers:{
  //       "x-api-key": props.apiKey,
  //       "Access-Control-Allow-Origin":"*"
  //     }
  //   });
  //   let parsedData = await data.json();
  //   setArticles(articles.concat(parsedData.articles))
  //   setTotalResults(parsedData.total_hits)
  //   }, 1500), [page, props.country, props.category, props.pageSize, props.apiKey]);
  const fetchMoreData = useCallback(throttle(async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&page=${page + 1}&apiKey=${props.apiKey}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log('Fetch more data response:', parsedData);
      console.log('Current articles length:', articles.length, 'Total results:', totalResults);

      if (parsedData.articles && parsedData.articles.length > 0) {
        setPage((prevPage) => prevPage + 1); // Safely update page using functional updates
        setArticles((prevArticles) => {
          const newArticles = prevArticles.concat(parsedData.articles);
          if (newArticles.length >= totalResults || parsedData.articles.length < props.pageSize) {
            setHasMore(false);
          }
          return newArticles;
        });
        setTotalResults(parsedData.totalResults || totalResults);
      } else {
        setHasMore(false);
      }
      // Add a delay to ensure no more than 1 request per second
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 second before allowing the next request
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  }, 5000), [page, props.country, props.category, props.pageSize, props.apiKey, articles.length, totalResults]);
    
    return (
      <>
        <Box textAlign="center" mt={8} mb={6}>
          <Heading
            size="2xl"
            fontFamily="'Courier New', monospace"
            color={theme.text}
            textTransform="uppercase"
            letterSpacing="2px"
            bg={theme.headingBg}
            border="4px solid"
            borderColor={theme.border}
            boxShadow={`8px 8px 0px ${theme.shadow}`}
            py={4}
            px={8}
            mx="auto"
            mt={20}
            display="inline-block"
            position="relative"
            _before={{
              content: '"▶▶"',
              position: "absolute",
              left: "-30px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
              color: "red.500"
            }}
            _after={{
              content: '"◀◀"',
              position: "absolute", 
              right: "-30px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
              color: "red.500"
            }}
          >
            ★ TOP {props.category.charAt(0).toUpperCase() + props.category.slice(1)} HEADLINES ★
          </Heading>
        </Box>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner color={props.color}/>}
          endMessage={
            <Box textAlign="center" mt={8} mb={4}>
              <Text
                fontSize="xl"
                fontFamily="'Courier New', monospace"
                color={theme.text}
                bg={theme.endMessageBg}
                border="3px solid"
                borderColor={theme.border}
                boxShadow={`6px 6px 0px ${theme.shadow}`}
                py={3}
                px={6}
                display="inline-block"
                textTransform="uppercase"
                fontWeight="bold"
                letterSpacing="1px"
              >
                ◆◇ GAME OVER - YOU REACHED THE END! ◇◆
              </Text>
            </Box>
          }
        >
            <div className="container ">
        <div className="row mx-lg-5">
          {( 
            articles.map((elem, index) => {
                return (
                  <div className="col-lg-4 my-2" key={index}>
                    <NewsItem
                      newsUrl={elem.url}
                      title={elem.title}
                      description={elem.description}
                      imageUrl={elem.urlToImage}
                      author={elem.author}
                      date={elem.publishedAt}
                      source={elem.source ? elem.source.name : "Unknown"}
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
