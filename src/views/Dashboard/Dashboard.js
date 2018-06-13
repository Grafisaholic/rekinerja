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
import ProfilePegawai from "./Pegawai/profile";
import HeaderPegawai from './Pegawai/header';

export default class DashboardView extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <HeaderPegawai/>
        <ProfilePegawai/>
      </div>
    )
  }
};
