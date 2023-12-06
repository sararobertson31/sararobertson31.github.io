import React from 'react';
import { useNavigate } from "react-router-dom";
import Page from '../page/Page';
import './grid-page.css';

const GridPage = ({ routes, stories, path }) => {
  const nav = useNavigate();

  const handleCardClick = ({id, link}) => {
    if (link) {
      window.open(link, '_blank')
    }
    else if (id) {
      nav(`/${path}/${id}`);
    }
  };

  return (
    <Page>
      <div className="grid-container">
        {stories.map((story) => (
          <div
            key={story.id}
            className="grid-item"
            onClick={() => handleCardClick(story)}
          >
            <img src={'/' + story.imageFile} alt={story.title} />
            <h3>{story.title}</h3>
          </div>
        ))}
      </div>
    </Page>
  );
};

export default GridPage;
