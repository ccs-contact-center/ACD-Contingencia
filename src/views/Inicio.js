import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import logo from "../assets/img/brand/logo.png";
import API_CCS from "../services/API_CCS";
import Timer from "./timer";
import people from "../assets/img/people.png";
import phone from "../assets/img/phone.png";
import bussy from "../assets/img/bussy.png";
import withAuth from "../services/withAuth";
import Avatar from "react-avatar";
//import { connect } from 'react-redux';
//import { addProfile, setCampaign, darkTheme,setAvatar } from '../../Redux/Actions/profile';

class Inicio extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor() {
    super();
    this.handleSelection = this.handleSelection.bind(this);
    this.API_CCS = new API_CCS();

    if (localStorage.getItem("status") === null) {
      localStorage.setItem("status", 2);
    }
  }
  state = {
    selected: localStorage.getItem("status") * 1
  };

  async handleSelection(e) {
    this.refs.child.initTimer();
    this.setState({ selected: e }, localStorage.setItem("status", e));
    const response = await this.API_CCS.updateStatus({
      usuario: this.props.user.usuario,
      status: e
    });
    console.log(response);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader className="text-center">¡Bienvenido!</CardHeader>
          <CardBody className="text-center">
            <Row>
              <Col>
                <img
                  src={logo}
                  alt="Logo CCS"
                  className="img-fluid"
                  style={{ width: "300px" }}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="text-center">Registro Telefónico</CardHeader>
          <CardBody className="text-center">
            <Row>
              <Col>
                <Avatar
                  size="150"
                  round={true}
                  src={people}
                  style={{
                    backgroundColor:
                      this.state.selected === 0
                        ? "rgba(4,180,4,0.8)"
                        : "rgba(4,180,4,0)"
                  }}
                  onClick={
                    this.state.selected === 0
                      ? null
                      : () => this.handleSelection(0)
                  }
                />
                <h4>Disponible</h4>
                {this.state.selected === 0 ? <Timer ref="child" /> : null}
              </Col>
              <Col>
                <Avatar
                  size="150"
                  round={true}
                  src={phone}
                  style={{
                    backgroundColor:
                      this.state.selected === 1
                        ? "rgba(255, 173, 51,0.8)"
                        : "rgba(255, 173, 51,0)"
                  }}
                  onClick={
                    this.state.selected === 1
                      ? null
                      : () => this.handleSelection(1)
                  }
                />
                <h4>En Llamada</h4>
                {this.state.selected === 1 ? <Timer ref="child" /> : null}
              </Col>
              <Col>
                <Avatar
                  size="150"
                  round={true}
                  src={bussy}
                  style={{
                    backgroundColor:
                      this.state.selected === 2
                        ? "rgba(192,3,39,0.8)"
                        : "rgba(192,3,39,0)"
                  }}
                  onClick={
                    this.state.selected === 2
                      ? null
                      : () => this.handleSelection(2)
                  }
                />
                <h4>No Disponible</h4>
                {this.state.selected === 2 ? <Timer ref="child" /> : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     profile: state.profile.profile,
//     campaign: state.campaign.campaign,
//     darkTheme: state.darkTheme.darkTheme
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     addProfile: (name) => {
//       dispatch(addProfile(name))
//     },
//     setCampaign: (id) => {
//       dispatch(setCampaign(id))
//     },
//     darkTheme: (isDarkTheme) => {
//       dispatch(darkTheme(isDarkTheme))
//     },
//     setAvatar: (data) => {
//       dispatch(setAvatar(data))
//     }

//   }
// }

//export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Inicio));
export default withAuth(Inicio);
