import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const RoomsItem = ({room, currentUser}) =>

  <div className="rooms-item">

    <div className="rooms-item-image">
      <Link to={`/room/${room._id}`}>
        <img className="rooms-item-image-contents" src={room.photos[0][0].secure_url}/>
        <div className="rooms-item-price"><div>${room.pricePerNight}<FormattedMessage id="rooms.per_night"/></div></div>
      </Link>
    </div>

    <div className="rooms-item-info">
      <Link to={`/room/${room._id}`}>
        <h3 className="rooms-item-name">{room.name}</h3>
        <h4 className="rooms-item-city">{room.city}</h4>
      </Link>
    </div>

  </div>

registerComponent('RoomsItem', RoomsItem);

export default RoomsItem;