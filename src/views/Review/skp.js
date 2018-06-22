import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	Alert,
	Form,
	Label,
	FormGroup,
	Input,
	Card,
	CardHeader,
	CardFooter,
	Table,
	CardBlock	
} from "reactstrap";

export default class ReviewSKP extends Component {
	constructor(props) {
		super(props)

		this.state = {
			list_pegawai : [{
				nama : 'Ruri Darmawan',
				nip : '201504050910200002',
				jabatan : 'Staff Administrator'
			},{
				nama : 'Ruri Darmawan',
				nip : '201504050910200002',
				jabatan : 'Staff Administrator'
			}]
		};
	};
	
	renderListPegawai() {
		return (
			<div>
				<table className="table table-striped">
					<tbody>
						{this.state.list_pegawai.map((p, k) => {
							return (
								<tr key={k}>
									<td>
										<div>
											<span>{p.nama}</span>
											<br/>
											<small>{p.jabatan}</small>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}

	renderListReview() {
		return (
			<div className="fadeIn table-responsive">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Tahun</th>
							<th>NIP Pegawai</th>
							<th>Nama Pegawai</th>
							<th>Tanggal Pembuatan</th>
							<th></th>
						</tr>
					</thead>
				</table>
			</div>
		)
	}
  render() {
	return (
		<Row className="animated fadeIn">
			<Col md="4">
				<Card>
					<CardHeader className="bg-primary">
						<strong>List Pegawai</strong>
					</CardHeader>
					<CardBlock className="card-body" style={{padding : 0}}>
						{this.renderListPegawai()}
					</CardBlock>
				</Card>
			</Col>

			<Col md="8">
				<Card>
					<CardHeader className="bg-primary">
						<strong>SKP Menunggu Persetujuan</strong>
					</CardHeader>
					<CardBlock className="card-body" style={{padding : 0}}>
						{this.renderListReview()}
					</CardBlock>
				</Card>
			</Col>
		</Row>
	)
  }
};
