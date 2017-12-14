import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";

// https://gist.github.com/vivmaha/f34fdea72d0f1fa0467a671b5ec7321e
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