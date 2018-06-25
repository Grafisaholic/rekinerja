import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  Form,
  Alert,
  FormGroup,
  FormText,
  Label,
  Input
} from "reactstrap";
import Select from 'react-select';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

export default class AddKegiatan extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      dataTarget : [],
      namaKegiatan : '',
      targetValue : '',
      waktu_mulai : '',
      waktu_selesai : '',
      lokasiKegiatan : '',
      file1 : '',
      file2 : '',
      file3 : '',
      error_message : ''
    };
  };

  getDataTarget() {
    let dataTarget = [{
      value : '1',
      label : 'Membuat Aplikasi Sistem Informasi'
    },{
      value : '2',
      label : 'Implementasi Aplikasi Di Masyarakat'
    }]

    this.setState({dataTarget})
  }

  componentDidMount() {
    this.getDataTarget()
  }

  onSimpan() {
    let data = {
      kegiatan_tugas_jabatan : this.state.targetValue,
      nama_kegiatan : this.state.namaKegiatan,
      waktu_mulai : this.state.waktu_mulai,
      waktu_selesai : this.state.waktu_selesai,
      file1 : this.state.file1,
      file2 : this.state.file2,
      file3 : this.state.file3,
    }
    let dataForm = new FormData();
    let imagedata1 = document.querySelector('input[type="file1"]').files[0];
    let imagedata2 = document.querySelector('input[type="file2"]').files[0];
    let imagedata3 = document.querySelector('input[type="file3"]').files[0];
    data.append("file1", imagedata1);
    data.append("file2", imagedata2);
    data.append("file3", imagedata3);

    this.setState({
      error_message : ''
    })

    if (data.kegiatan_tugas_jabatan != '' || data.nama_kegiatan != '' || data.waktu_mulai != '' || data.waktu_selesai != '') {
      // this.props.onFinish(data)
      console.log(data);
      fetch("http://localhost:8910/taskCreationController/createStoryTask", {
        mode: 'no-cors',
        method: "POST",
        body: data
      }).then(function (res) {
        console.log(res);
        if (res.ok) {
          alert("Perfect! ");
        } else if (res.status == 401) {
          alert("Oops! ");
        }
      }, function (e) {
        alert("Error submitting form!");
      });
    } else {
      this.setState({
        error_message : 'Mohon Lengkapi Semua Data'
      })
    }
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Info message={data.info.kegiatan.infoTambah}/>
        {
          this.state.error_message && <Alert color="warning">{this.state.error_message}</Alert>
        }
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor="name">KEGIATAN TUGAS JABATAN</Label>
              <Select
                name="form-field-name"
                value={this.state.targetValue}
                onChange={(targetValue) => this.setState({targetValue})}
                options={this.state.dataTarget}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="name">NAMA KEGIATAN</Label>
              <Input type="text" id="name" placeholder="Masukkan Kegiatan" onChange={(nama_kegiatan) => this.setState({nama_kegiatan})} required/>
            </FormGroup>

            <FormGroup>
              <Row>
                  <Col md="6">
                    <Label>Waktu Mulai</Label>
                    <TimePicker
                      className="form-control"
                      showSecond={false}
                      onChange={(waktu_mulai) => this.setState({waktu_mulai})}/>
                  </Col>
                  <Col md="6">
                    <Label>Waktu Mulai</Label>
                    <TimePicker
                      className="form-control"
                      showSecond={false}
                      onChange={(waktu_selesai) => this.setState({waktu_selesai})}/>
                  </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lokasiKegiatan">Lokasi Kegiatan</Label>
              <Input type="text" id="lokasiKegiatan" placeholder="Masukkan Lokasi Kegiatan" onChange={(e) => this.setState({lokasiKegiatan : e.target.value})} required/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="file1">File Pendukung (1)</Label>
              <input className="form-control" type="file" id="file1" required/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="file1">File Pendukung (2)</Label>
              <input className="form-control" type="file" id="file2"/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="file1">File Pendukung (3)</Label>
              <input className="form-control" type="file" id="file3"/>
            </FormGroup>

            <FormGroup>
              <Button color="primary" onClick={this.onSimpan.bind(this)}>SIMPAN</Button>
              <Button color="default" onClick={this.props.onClose.bind(this)}>BATAL</Button>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
};
