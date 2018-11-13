import React, { Component } from 'react';
import like_icon from './like_icon.svg';
import collection_icon from './collection_icon.svg';

class Photo extends Component {
	state = {
		showBar: false
	}

	showBar = () =>
	this.setState({ showBar: true });

	hideBar = () =>
		this.setState({ showBar: false });

	render() {
		const {showBar} = this.state
		const {photo} = this.props
		
		return (
			<div className="feed__img-container" onMouseEnter={this.showBar} onMouseLeave={this.hideBar}>
				<img src={photo.photo_url} alt={photo.title}/>
				{showBar &&
					<div className="bottom-bar">
						<div className="user-data">
							<div className="avatar">{photo.author_avatar ? photo.author_avatar : photo.author[0]}</div>
							{photo.author}
						</div>
						<div className="buttons">
							<button><img src={like_icon} alt=""/></button>
							<button><img src={collection_icon} alt=""/></button>
						</div>
					</div>
				}
			</div>
		);
	}
}
 
export default Photo;