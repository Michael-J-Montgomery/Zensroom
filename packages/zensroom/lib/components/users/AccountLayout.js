/*

Account Layout

*/

import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Helmet from 'react-helmet';

const AccountLayout = ({currentUser, children, currentRoute}) =>

  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">

    <Helmet>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Helmet>

    <Components.Header />

    <Components.AccountHeader />
  
    <div className="main">

      <Components.FlashMessages />

      {React.cloneElement(children, { currentUser })}

    </div>
  
    <Components.Footer />
  
  </div>

registerComponent('AccountLayout', AccountLayout);

// export default withCurrentUser(AccountLayout);
