import React, { Component } from 'react';
import { Components, registerComponent, getSetting } from 'meteor/vulcan:core';
import { Form, Input } from 'formsy-react-components';
import { withRouter } from 'react-router'
import DateTimePicker from 'react-datetime';
import Button from 'react-bootstrap/lib/Button';
import { FormattedMessage } from 'meteor/vulcan:i18n';

class RoomsSearchForm extends Component {
  constructor() {
    super();
    this.updateFromDate = this.updateFromDate.bind(this);
    this.updateToDate = this.updateToDate.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {};
  }

  updateFromDate(date) {
    this.setState({ from: date.format('YYYY-MM-DD') });
  }

  updateToDate(date) {
    this.setState({ to: date.format('YYYY-MM-DD') });
  }

  async submitForm({ location }) {
    
    let query = '';

    if (this.state.from) {
      query += `from=${this.state.from}`;
    }

    if (this.state.to) {
      query += `&to=${this.state.to}`;
    }

    if (location) {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${getSetting('googlemaps').apiKey}`

      const response = await fetch(geocodeUrl);
      const geoData = await response.json();
      console.log(geoData)
      query += `&lng=${geoData.results[0].geometry.location.lng}&lat=${geoData.results[0].geometry.location.lat}`
    }

    this.props.router.push(`/search?${query}`);
  }

  render() {

    return (
      <div className="card rooms-search-form">
        <Form onSubmit={this.submitForm}>

          <div className="rooms-search-form-field">
            <label className="control-label"><FormattedMessage id="rooms.from"/></label>
            <DateTimePicker
              onChange={newDate => this.updateFromDate(newDate)}
              format={"x"}
            />
          </div>

          <div className="rooms-search-form-field">
            <label className="control-label"><FormattedMessage id="rooms.to"/></label>
            <DateTimePicker
              onChange={newDate => this.updateToDate(newDate)}
              format={"x"}
            />
          </div>

          <div className="rooms-search-form-field">
            <label className="control-label"><FormattedMessage id="rooms.location"/></label>
            <Input layout="elementOnly" value="" name="location" type="text" label="location"/>
          </div>

          <div className="rooms-search-form-field">
            <Button className="rooms-search-form-submit" type="submit" bsStyle="primary"><FormattedMessage id="rooms.search"/></Button>
          </div>

        </Form>
      </div>
    );
  }

}

export default withRouter(RoomsSearchForm);