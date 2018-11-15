import React, { Component } from 'react';
import api from '../../api';
import Photo from './Photo'

class Feed extends Component {
	state = {
		photos_data: []
	}
	
	componentDidMount() {
		api.photos.all().then(data => 
			this.setState({ photos_data: data.data }));
	}

	perfomanceTest = () => {
		let arr = [];
		let i;
		let time;
		for (i = 0; i < 2000000; i++) {
			if (i % 5000 === 0) {
				arr.push({
					id: i,
					prop1: 'fsdf',
					prop2: 'fsdf',
					prop3: 'fsdf',
					prop5: 'fsdf',
					prop6: 'fsdf',
					prop7: 'fsdf',
					prop8: 'fsdf',
					prop9: 'fsdf',
					prop10: 'fsdf',
					prop11: 'fsdf',
					prop12: 'fsdf',
					prop13: 'fsdf',
					prop14: 'fsdf',
					anchor: 'anchor'
				})
			} else {
				arr.push({
					id: i,
					prop1: 'fsdf',
					prop2: 'fsdf',
					prop3: 'fsdf',
					prop5: 'fsdf',
					prop6: 'fsdf',
					prop7: 'fsdf',
					prop8: 'fsdf',
					prop9: 'fsdf',
					prop10: 'fsdf',
					prop11: 'fsdf',
					prop12: 'fsdf',
					prop13: 'fsdf',
					prop14: 'fsdf'
				})
			}
			
		}
		let start = performance.now();
		this.findItemLoop(arr, 169937)
		time = performance.now()-start
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

	render() {
		const {photos_data} = this.state;

		const photos = photos_data.map(data => 
			<Photo key={data._id} photo={data}/>
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

export default Feed;


