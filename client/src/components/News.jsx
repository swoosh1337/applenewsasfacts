import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../news-item.css";
import "../buttons.css";
import Pagination from "./Pagination"; // Adjust the import path as needed

function News() {
  const [allArticles, setAllArticles] = useState([]);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=apple&from=2023-12-12&to=2023-12-12&sortBy=popularity&apiKey=6d7e9e1691654eac8f5289899b69b988`
        );
        if (response.ok) {
          const newsData = await response.json();
          setAllArticles(newsData.articles.slice(0, 100)); // For client-side pagination
        } else {
          console.error("API response not ok:", response);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setArticlesToShow(allArticles.slice(startIndex, endIndex));
  }, [currentPage, allArticles]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="news-container">
        {articlesToShow.map((article, index) => (
          <div className="news-article" key={index}>
            <h2 className="news-title">{article.title}</h2>
            <p className="news-description">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-read-more"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allArticles.length / pageSize)}
        setCurrentPage={setCurrentPage}
        scrollToTop={scrollToTop}
      />
    </div>
  );
}

export default News;
