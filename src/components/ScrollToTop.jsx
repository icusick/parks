import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";

// Scroll restoration based on https://reacttraining.com/react-router/web/guides/scroll-restoration.
export var ScrollToTop = withRouter(
  class ScrollToTopWithoutRouter extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }

    render() {
      return null;
    }
  }
);