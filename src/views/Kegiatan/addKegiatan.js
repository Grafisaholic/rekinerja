import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";

export default class AddKegiatan extends Component {
  render() {
	return (
		<div className="animated fadeIn">
			<Row>
				<Col xs="12" sm="6">
					<Card>
						<CardHeader className="bg-primary">
							<strong>Kegiatan</strong>
							<br/>
							<small>Tambah Kegiatan</small>
						</CardHeader>

              <CardBlock className="card-body">
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Pilih Kegiatan</Label>
                      <Input type="text" id="name" placeholder="Masukkan Kegiatan" required/>
                    </FormGroup>
                  </Col>
                </Row>
							</CardBlock>
					</Card>
				</Col>
			</Row>
		</div>
		)
  }
};
