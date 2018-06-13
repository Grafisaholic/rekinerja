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
  constructor(props) {
    super(props)
  
    this.state = {
			 pegawai : {},
			 atasan : {}
    };
  };
  
  fetchInfo() {
    fetch(data.api + '/info').then((text) => text.json()).then((result) => {
      if (result.status == 200) {
        this.setState({
					pegawai : result.data.pegawai[0],
					atasan : result.data.atasan[0]
        })
      }
    })
  }

  componentDidMount() {
    this.fetchInfo()
	}
	
  render() {
		return (
			<div className="animated fadeIn">
				<Row>
						{/* PEGAWAI */}
						<Col md="6" lg="6" xs="12">
								<Card>
									<CardHeader className="bg-primary">
										<strong>Profile Pegawai</strong>
									</CardHeader>
									<CardBlock style={{padding : 0}}>
										<Row>
										{/* PEGAWAI */}
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
															<td>NIP Pegawai</td>
															<td width="50px">:</td>
															<td>{this.state.pegawai.nip}</td>
														</tr>
														<tr>
															<td>Nama Pegawai</td>
															<td width="50px">:</td>
															<td>{this.state.pegawai.nama}</td>
														</tr>
														<tr>
															<td>Jabatan</td>
															<td width="50px">:</td>
															<td>{this.state.pegawai.nama_jabatan}</td>
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
						</Col>




						{/* ATASAN */}
						<Col md="6" lg="6" xs="12">
								<Card>
									<CardHeader className="bg-primary">
										<strong>Profile Atasan</strong>
									</CardHeader>
									<CardBlock style={{padding : 0}}>
										<Row>
											{/* PEGAWAI */}
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
																<td>NIP Pegawai</td>
																<td width="50px">:</td>
																<td>{this.state.atasan.nip}</td>
															</tr>
															<tr>
																<td>Nama Pegawai</td>
																<td width="50px">:</td>
																<td>{this.state.atasan.nama}</td>
															</tr>
															<tr>
																<td>Jabatan</td>
																<td width="50px">:</td>
																<td>{this.state.atasan.nama_jabatan}</td>
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
						</Col>						
					</Row>
			</div>
		)
  }
};
