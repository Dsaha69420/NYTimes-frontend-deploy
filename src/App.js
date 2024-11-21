import React, { useState } from 'react';
import DisplayResults from "./Components/SearchResults/SearchResults";
import ArticleDetails from "./Components/ArticleDetails/ArticleDetails";

const App = () => {
    const [selectedArticleId, setSelectedArticleId] = useState(null);

    return (
        <div>
            {!selectedArticleId && <DisplayResults setSelectedArticleId={setSelectedArticleId} />}
            {selectedArticleId && <ArticleDetails articleId={selectedArticleId} />}
        </div>
    );
};

export default App;
