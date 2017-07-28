/*

### withList

Paginated items container

Options: 

  - queryName: an arbitrary name for the query
  - collection: the collection to fetch the documents from
  - fragment: the fragment that defines which properties to fetch
  - fragmentName: the name of the fragment, passed to getFragment
  - limit: the number of documents to show initially
  - pollInterval: how often the data should be updated, in ms (set to 0 to disable polling)
  - terms: an object that defines which documents to fetch

Props Received: 

  - terms: an object that defines which documents to fetch

Terms object can have the following properties:

  - view: String
  - userId: String
  - cat: String
  - date: String
  - after: String
  - before: String
  - enableCache: Boolean
  - listId: String
  - query: String # search query
  - postId: String
  - limit: String
         
*/
     
import React, { PropTypes, Component } from 'react';
import { withApollo, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import { getFragment, getFragmentName, getDefaultFragment } from 'meteor/vulcan:core';
import Mingo from 'mingo';
import compose from 'recompose/compose';
import withState from 'recompose/withState';

const withList = (component) => {

  // build graphql query from options
  // const query = gql`
  //   query ${queryName}($terms: JSON) {
  //     RoomsSearch (terms: $terms) {
  //       __typename
  //       ...${fragmentName}
  //     }
  //   }
  //   ${fragment}
  // `;

  const query = gql`
    query RoomsSearchQuery($terms: JSON) {
      RoomsSearch (terms: $terms) {
        __typename
        _id
        name
        description
        photos
      }
    }
  `;

  return compose(

    // wrap component with Apollo HoC to give it access to the store
    withApollo, 

    // wrap component with HoC that manages the terms object via its state
    withState('paginationTerms', 'setPaginationTerms', props => {

      // get initial limit from props, or else options
      const paginationLimit = props.terms && props.terms.limit;
      const paginationTerms = {
        limit: paginationLimit, 
        itemsPerPage: paginationLimit, 
      };
      
      return paginationTerms;
    }),

    // wrap component with graphql HoC
    graphql(

      query,

      {
        alias: 'withList',
        
        // graphql query options
        options({terms, paginationTerms, client: apolloClient}) {
          // get terms from options, then props, then pagination
          const mergedTerms = {...terms, ...paginationTerms};
          return {
            variables: {
              terms: mergedTerms,
            },
            // note: pollInterval can be set to 0 to disable polling (20s by default)
            pollInterval: 20000,
          };
        },

        // define props returned by graphql HoC
        props(props) {

          const refetch = props.data.refetch,
                // results = Utils.convertDates(collection, props.data[listResolverName]),
                results = props.data.RoomsSearch,
                networkStatus = props.data.networkStatus,
                error = props.data.error;

          if (error) {
            console.log(error);
          }

          return {
            // see https://github.com/apollostack/apollo-client/blob/master/src/queries/store.ts#L28-L36
            // note: loading will propably change soon https://github.com/apollostack/apollo-client/issues/831
            loading: networkStatus === 1,
            results,
            // totalCount,
            refetch,
            networkStatus,
            error,
            count: results && results.length,

            // regular load more (reload everything)
            loadMore(providedTerms) {
              // if new terms are provided by presentational component use them, else default to incrementing current limit once
              const newTerms = typeof providedTerms === 'undefined' ? { /*...props.ownProps.terms,*/ ...props.ownProps.paginationTerms, limit: results.length + props.ownProps.paginationTerms.itemsPerPage } : providedTerms;
              
              props.ownProps.setPaginationTerms(newTerms);
            },

            ...props.ownProps // pass on the props down to the wrapped component
          };
        },
      }
    )
  )(component);
}

export default withList;
