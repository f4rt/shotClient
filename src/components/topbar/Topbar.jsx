import logo from './logo.svg';
import React from 'react';
import Search from './Search';
import Userbar from './Userbar';

const Topbar = () => {
	return (
		<div className="topbar">
			<Search />
			<img src={logo} alt=""/>
			<Userbar />			
		</div>
	);
}
 
export default Topbar;