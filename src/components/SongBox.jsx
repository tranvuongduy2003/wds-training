import React from 'react';
import PropTypes from 'prop-types';

const SongBox = (props) => {
  const { imageUrl, name, desc } = props;
  return (
    <div className="songbox">
      <div>
        <img src={imageUrl} alt="thumbnail" className="thumbnail" />
      </div>
      <h3 className="name">{name}</h3>
      <p className="desc">{desc}</p>
    </div>
  );
};

SongBox.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

SongBox.defaultProps = {
  desc: '',
};

export default SongBox;
