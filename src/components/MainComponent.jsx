import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { addComment, fetchCampsites } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};

// can be set up as a function or an object (recommended)
const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) => addComment(campsiteId, rating, author, text),
  fetchCampsites: () => fetchCampsites(),
  resetFeedbackForm: () => actions.reset("feedbackForm"),
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchCampsites();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          campsite={this.props.campsites.campsites.filter((campsite) => campsite.featured)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
          partner={this.props.partners.filter((partner) => partner.featured)[0]}
        />
      );
    };

    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo
          campsite={this.props.campsites.campsites.filter((campsite) => campsite.id === +match.params.campsiteId)[0]}
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
          comments={this.props.comments.filter((comment) => comment.campsiteId === +match.params.campsiteId)}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/directory" render={() => <Directory campsites={this.props.campsites} />} />
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          <Route exact path="/contact" render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route exact path="/about" render={() => <About partners={this.props.partners} />} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
