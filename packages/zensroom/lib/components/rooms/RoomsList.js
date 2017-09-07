/*

Room list, wrapped with withList

http://docs.vulcanjs.org/data-loading.html#List-Resolver

*/

import React from 'react';
import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';

import Rooms from '../../modules/rooms/collection';
// import RoomsItem from './RoomsItem';

const RoomsList = ({results = [], currentUser, loading, loadMore, count, totalCount}) => 
  
  <div>

    {loading ? 

      <Components.Loading /> :

      <div>
      
        <div className="rooms-grid">
          {results.map(room => <Components.RoomsItem key={room._id} room={room} currentUser={currentUser} />)}
        </div>

        {totalCount > results.length ?
          <a className="rooms-grid-load-more" href="javascript:void(0)" onClick={e => {e.preventDefault(); loadMore();}}><FormattedMessage id="rooms.load_more"/> ({count}/{totalCount})</a> 
        : null}

      </div>
    }

  </div>

const options = {
  collection: Rooms
};

registerComponent('RoomsList', RoomsList, [withList, options], withCurrentUser);

// export default withList(options)(withCurrentUser(RoomsList));