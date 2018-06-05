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

export default class ProfilePegawai extends Component {
  render() {
	return (
	  <div className="animated fadeIn">
	  	<Card>
			<CardBlock style={{padding : 0}}>
				<Row>
					<Col lg="4" md="4" xs="12" sm="12">
						<center>
							<div style={{backgroundImage : 'url(\'img/avatars/6.jpg\')', backgroundSize : 'cover', backgroundRepeat : 'no-repeat', width : '100%', backgroundPosition : 'center', marginTop : '10px', marginLeft : '10px', height : '200px'}}/>
							<br/>
						</center>
					</Col>
					<Col lg="8" md="8" xs="12" sm="12">
						<table className="table table-striped" style={{marginTop : '10px'}}>
							<tbody>
								<tr>
									<td>Nama Atasan</td>
									<td width="50px">:</td>
									<td>Ruri Darmawan Sektiaji S.Kom M.Kom</td>
								</tr>
								<tr>
									<td>NIP</td>
									<td width="50px">:</td>
									<td>33170606017272818</td>
								</tr>
								<tr>
									<td>Nama</td>
									<td width="50px">:</td>
									<td>Shodiqul Muzaki</td>
								</tr>
								<tr>
									<td>Jabatan</td>
									<td width="50px">:</td>
									<td>Staff Administrator</td>
								</tr>
								<tr>
									<td>Unit Kantor</td>
									<td width="50px">:</td>
									<td>Kudus</td>
								</tr>
							</tbody>
						</table>
					</Col>
				</Row>
			</CardBlock>
		</Card>
	  </div>
	)
  }
};
