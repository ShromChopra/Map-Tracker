import React, { useContext } from 'react';
import { UserContext } from '../Menu/Menu';
import Menu from '../Menu/Menu';

function LatestNews() {
  const context = useContext(UserContext) || {};
  const { username, login } = context;
  return (
    <Menu login={login} username={username}>
      <div className="latest-news-page">
        <h2>Latest News</h2>
        <p>Welcome, {username}! Here are the latest updates...</p>
      </div>
    </Menu>
  );
}

export default LatestNews;
