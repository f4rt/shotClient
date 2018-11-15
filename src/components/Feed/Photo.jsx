import React, { Component } from 'react';
import like_icon from './like_icon.svg';
import collection_icon from './collection_icon.svg';
import PhotoFull from './PhotoFull'

class Photo extends Component {
	state = {
		showBar: false,
		fullView: false
	}

	showBar = () =>
	this.setState({ showBar: true });

	hideBar = () =>
		this.setState({ showBar: false });

	showFull = () =>
		this.setState({ fullView: true });

	hideFull = () =>
		this.setState({ fullView: false });

	render() {
		const {showBar, fullView} = this.state;
		const {photo} = this.props;
		
		return (
			<React.Fragment>
				<div className="feed__img-container" onMouseEnter={this.showBar} onMouseLeave={this.hideBar} onClick={this.showFull}>
					<img src={photo.photo_url} alt={photo.title}/>
					{showBar &&
						<div className="bottom-bar">
							<div className="user-data">
								<div className="avatar" style={{ backgroundImage: 'url(' + photo.author_photo + ')' }}>
									{!photo.author_photo && photo.author_name[0]}
								</div>
								{photo.author_name}
							</div>
							<div className="buttons">
								<button><img src={like_icon} alt="Like it"/></button>
								<button><img src={collection_icon} alt="Add to your collection"/></button>
							</div>
						</div>
					}		
				</div>
				{fullView &&
					<PhotoFull photo={photo} close={this.hideFull}/>
				}
			</React.Fragment>
		);
	}
}
 
export default Photo;