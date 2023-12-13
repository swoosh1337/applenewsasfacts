import React, { useState, useEffect } from "react";
import '../news-item.css'; // Adjust the path if necessary

function NewsComponent() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=tesla&from=2023-11-13&sortBy=publishedAt&apiKey=6d7e9e1691654eac8f5289899b69b988"
        );
        const newsData = await response.json();
        setArticles(newsData.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="news-container">
        {articles.map((article, index) => (
            <div className="news-article" key={index}>
                <div className="news-image-container">
                    {article.urlToImage && (
                        <img src={article.urlToImage} alt={article.title} className="news-image" />
                    )}
                </div>
                <div className="news-text-container">
                    <h2 className="news-title">{article.title}</h2>
                    <p className="news-description">{article.description}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-read-more">
                        Read more
                    </a>
                </div>
            </div>
        ))}
    </div>
);


}

export default NewsComponent;
