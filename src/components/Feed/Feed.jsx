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

	render() {
		const {photos_data} = this.state;

		const photos = photos_data.map(data => 
			<Photo key={data._id} photo={data}/>
		)
	
		return (
			<div className="feed-container">
				<div className="feed">
					{photos}
				</div>
			</div>
		);
	}
}

export default Feed;


