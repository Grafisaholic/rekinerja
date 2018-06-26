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
import _ from 'underscore';

export default class ReviewCapaianSKP extends Component {
	constructor(props) {
		super(props)

		this.state = {
			list_pegawai : [],
			list_review : [],
			pegawai : {},
		};

		this.getBawahan = this.getBawahan.bind(this);
	};

	componentDidMount () {
		this.getBawahan();
	}

	getReview (row) {
		this.setState({
			list_review : [],
		});
		
	}

	getBawahan () {
		let URL = data.api+"/info/bawahan";
		fetch(URL).then((response) => response.json())
			.then((responseData) => {
				if (responseData.status == 200 ) {
					let arr = [];
					_.each(responseData.data, (item, i) => {
						arr.push({
							nama : item.nama,
							nip : item.nip,
							jabatan : item.nama_jabatan,
							kode_lokasi : item.kode_lokasi
						});
					});
					this.setState({
						list_pegawai : arr
					});
				}
			})
			.catch((err) => {

			});
	}
	
	renderListPegawai() {
		return (
			<div>
				<table className="table table-striped">
					<tbody>
						{this.state.list_pegawai.map((p, k) => {
							return (
								<tr key={k}>
									<td onClick={() => this.getReview(p)} style={{cursor : 'pointer'}}>
										<a href="javascript:void(0)">
											<div>
												<span>{p.nama}</span>
												<br/>
												<small>{p.jabatan}</small>
											</div>
										</a>
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
							<th>Kegiatan Tugas Jabatan</th>
							<th>AK</th>
							<th>Kuantitas</th>
							<th>Kualitas</th>
							<th>Waktu</th>
							<th>Biaya</th>
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
							<strong>Capaian Menunggu Persetujuan</strong>
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
