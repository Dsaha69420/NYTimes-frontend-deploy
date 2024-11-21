import React, { useEffect, useState } from 'react';

const ArticleDetails = ({ articleId }) => {
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    const fetchArticleDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/articles?query=`);
            if (!response.ok) {
                throw new Error('Failed to fetch article details');
            }
            const data = await response.json();
            const selectedArticle = data.response.docs.find((doc) => doc._id === articleId);
            setArticle(selectedArticle);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (articleId) fetchArticleDetails();
    }, [articleId]);

    if (error) return <p>{error}</p>;
    if (!article) return <p>Loading article details...</p>;

    return (
        <div>
            <h1>{article.headline.main}</h1>
            <p>{article.lead_paragraph}</p>
            <p>Source: {article.source}</p>
            <p>Published Date: {article.pub_date}</p>
            <a href={article.web_url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
    );
};

export default ArticleDetails;
