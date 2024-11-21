import React, { useState } from 'react';

const SearchResults = () => {
    const [query, setQuery] = useState("");
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}?q=${query}`);
            //if (!response.ok) throw new Error("Failed to fetch articles");
            const data = await response.json();
            console.log(data);
            setArticles(data.response.docs); // Set articles data
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchArticles();
    };

    return (
        <div>
            <h2>NY Times Article Search</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for articles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {articles.length > 0 && (
                    <ul>
                        {articles.map((article) => (
                            <li key={article._id}>
                                <h3>{article.headline.main}</h3>
                                <p>{article.snippet}</p>
                                <button onClick={() => window.alert(`Selected Article ID: ${article._id}`)}>View Details</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
