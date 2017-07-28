import React from 'react';
import { Components, withList, withCurrentUser } from 'meteor/vulcan:core';

import Rooms from '../../modules/rooms/collection';
import RoomsItem from './RoomsItem';

const RoomsList = ({results = [], currentUser, loading, loadMore, count, totalCount}) => 
  
  <div>

    {loading ? 

      <Components.Loading /> :

      <div className="rooms">

        {results.map(room => <RoomsItem key={room._id} room={room} currentUser={currentUser} />)}
        
        {totalCount > results.length ?
          <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> : 
          <p>No more items.</p>
        }

      </div>
    }

  </div>

const options = {
  collection: Rooms
};

export default withList(options)(withCurrentUser(RoomsList));