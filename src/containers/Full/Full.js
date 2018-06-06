import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Kegiatan from '../../views/Kegiatan'
import SKP from '../../views/SKP'

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/skp/kegiatan" name="Kegiatan" component={Kegiatan.List}/>
                <Route path="/skp/kegiatan/add" name="Buat Kegiatan" component={Kegiatan.createNew}/>
                <Route path="/skp/list-skp" name="List SKP" component={SKP.listSKP}/>
                <Route path="/skp/capaian-skp" name="Capaian SKP" component={SKP.capaianSKP}/>
                <Route path="/skp/target-skp" name="Target SKP" component={SKP.targetSKP}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
