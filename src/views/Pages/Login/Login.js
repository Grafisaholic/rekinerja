import React, {Component} from "react";
import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import swal from 'sweetalert'

class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username : '',
       password : ''
    };
  };

  onSubmitLogin() {
    const {username, password} = this.state
    if (username == '' || password == '') {
      swal("Warning !", "Username / Password Tidak Benar !", "error");
    } else {
      let dataLogin = {
        username : username,
        password : password
      }
    }
  }
  
  render() {
    return (
      <div>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="5">
                <center>
                  <h1 className="text-white">E-KINERJA</h1>
                  <p className="text-white">Sistem Informasi Sasaran Kinerja Pegawai</p>
                </center>
                <CardGroup className="mb-0">
                  <Card className="p-4">
                    <CardBlock className="card-body" style={{paddingTop: '0px'}}>
                      <h2>Login Aplikasi</h2>
                      <p className="text-muted">Silahkan Login Ke Akun Anda</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                        <Input type="text" placeholder="Username" value={this.state.username} onChange={({target}) => this.setState({username : target.value})}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                        <Input type="password" value={this.state.password} placeholder="Password" onChange={({target}) => this.setState({password : target.value})}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.onSubmitLogin.bind(this)}>Login</Button>
                        </Col>
                      </Row>
                    </CardBlock>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="background-s"></div>
      </div>
    );
  }
}

export default Login;
