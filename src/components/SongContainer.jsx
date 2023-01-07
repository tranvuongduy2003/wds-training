import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SongBox from './SongBox';

const tempSongs = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1673010960635-d0d1ad81b90a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Gác Lại Âu Lo',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat voluptatem deleniti ab aperiam quibusdam quo nisi',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1507534364004-bc2556fa7cc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2222&q=80',
    name: 'V-Weekend',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat voluptatem deleniti ab aperiam quibusdam quo nisi',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1673010960635-d0d1ad81b90a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Năng Lượng Tích Cực',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat voluptatem deleniti ab aperiam quibusdam quo nisi',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1526336179256-1347bdb255ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    name: 'Nhạc Mới Tết Này',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat voluptatem deleniti ab aperiam quibusdam quo nisi',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1515545109095-cf8abbc557f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
    name: 'Nhạc Xuân Sôi Động',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat voluptatem deleniti ab aperiam quibusdam quo nisi',
  },
];

const SongContainer = ({ title }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // lấy giá trị của các bài hát từ server về
    // lấy được giá trị từ server về lưu vào tempSongs
    setSongs(tempSongs);
  }, []);
  return (
    <div style={{ padding: '50px' }}>
      <h2>{title}</h2>
      {/* container */}
      <div className="song-container">
        {songs.map((song, index) => (
          <SongBox
            key={index}
            imageUrl={song.imageUrl}
            name={song.name}
            desc={song.desc}
          ></SongBox>
        ))}
      </div>
    </div>
  );
};

SongContainer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SongContainer;
