import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { PARTNERS } from "../shared/partners";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      partners: PARTNERS,
    };
  }

  render() {
    const HomePage = () => {
      return <Home campsite={this.state.campsites.filter((campsite) => campsite.featured)[0]} promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]} partner={this.state.partners.filter((partner) => partner.featured)[0]} />;
    };

    const CampsiteWithId = ({ match }) => {
      return <CampsiteInfo campsite={this.state.campsites.filter((campsite) => campsite.id === +match.params.campsiteId)[0]} comments={this.state.comments.filter((comment) => comment.campsiteId === +match.params.campsiteId)} />;
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/directory" render={() => <Directory campsites={this.state.campsites} />} />
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" render={() => <About partners={this.state.partners} />} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
