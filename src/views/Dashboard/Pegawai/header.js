import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	Card,
	CardHeader,
	CardFooter,
	CardBlock,
	Table,
} from "reactstrap";

export default class HeaderProfile extends Component {
  render() {
	return (
        <Row>
          <Col xs="12" sm="12" lg="4" md="4" className="animated fadeIn">
            <Card className="bg-success">
              <CardBlock>
                <Row>
                  <Col md="4" className="text-center">
                    <i className="fa fa-book fa-4x"/>
                  </Col>
                  <Col md="8" className="text-right">
                    <h3 className="text-default"><b>40</b></h3>
                    <small>Target Pending</small>
                  </Col>
                </Row>
              </CardBlock>
            </Card>
          </Col>

          <Col xs="12" sm="12" lg="4" md="4" className="animated fadeIn">
            <Card className="bg-danger">
              <CardBlock>
                <Row>
                  <Col md="4" className="text-center">
                    <i className="fa fa-calendar-check-o fa-4x"/>
                  </Col>
                  <Col md="8" className="text-right">
                    <h3 className="text-default"><b>40</b></h3>
                    <small>Capaian Pending</small>
                  </Col>
                </Row>
              </CardBlock>
            </Card>
          </Col>

          <Col xs="12" sm="12" lg="4" md="4" className="animated fadeIn">
            <Card className="bg-primary">
              <CardBlock>
                <Row>
                  <Col md="4" className="text-center">
                    <i className="fa fa-history fa-4x"/>
                  </Col>
                  <Col md="8" className="text-right">
                    <h3 className="text-default"><b>40</b></h3>
                    <small>Kegiatan Pending</small>
                  </Col>
                </Row>
              </CardBlock>
            </Card>
          </Col>
        </Row>
	)
  }
};
