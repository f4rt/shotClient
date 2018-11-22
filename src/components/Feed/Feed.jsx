import React, { Component } from 'react';
import api from '../../api';
import Photo from './Photo';
import {connect} from 'react-redux';
import {like, addToCollection} from '../../actions/userActions'

class Feed extends Component {
	state = {
		photos_data: []
	}
	
	componentDidMount() {
		api.photos.showAll().then(data => {
			this.setState({ photos_data: data.data })
		})
	}

	perfomanceTest = () => {
		let arr = [];
		let i;
		let time;
		for (i = 0; i < 4000000; i++) {
			arr.push({
				id: i,
				prop1: 'fsdf',
				prop2: 'fsdf',
				value: Math.random(1, 1000000)
			})			
		}
		let start = performance.now();
		// this.findItemLoop(arr, 169937)
		this.arrSort(arr);
		time = performance.now()-start
		console.log(arr)
		console.log(time)
	}

	findItem = (arr, item_id) => {
		arr.forEach(item => {
			if(item.id === item_id) {
				console.log('find It ' + item.id)
			}
		})
	}

	findItemLoop = (arr) => {
		let i;
		for (i = 0; i < arr.length; i++) {
			let item = arr[i];
			if (item.anchor) {
				console.log('Find it ' + item.id)
			}
		}
	}

	arrSort = (arr) => {
		arr.sort((a, b) =>{
			return a.value - b.value;
		})	
	}

	render() {
		const {photos_data} = this.state;
		const photos = photos_data.map(data => 
			<Photo 
				key={data._id} 
				photo={data} 
				user={this.props.user} 
				likeFunc={this.props.like}
				addToCollection={this.props.addToCollection}
				/>
		)
	
		return (
			<div className="feed-container">
			<button onClick={this.perfomanceTest}>PERFORMANCE TEST</button>
				<div className="feed">
					{photos}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return ({
		user: state.user
	})
}

export default connect(mapStateToProps, {like, addToCollection})(Feed);


