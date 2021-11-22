import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
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
      return (
        <Home
          campsite={this.state.campsites.map((campsite) => campsite.featured === true)[0]}
          promotion={this.state.promotions.map((promotion) => promotion.featured === true)[0]}
          partner={this.state.partners.map((partner) => partner.featured === true)[0]}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/directory" render={() => <Directory campsites={this.state.campsites} />} />
          <Route exact path="/contact-us" component={Contact} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
