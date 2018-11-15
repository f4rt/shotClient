import React, { Component } from 'react';
import like_icon from './like_icon.svg';
import liked_icon from './liked_icon.svg';
import collection_icon from './collection_icon.svg';
import PhotoFull from './PhotoFull';
import api from '../../api';

class Photo extends Component {
	state = {
		showBar: false,
		fullView: false,
		likeStatus: false,
		likesCount: this.props.photo.likes
	}

	componentDidMount() {
		const {photo, user}= this.props;
		let i;
		for (i = 0; i < user.liked_photos.length; i++) {
			if(user.liked_photos[i] === photo._id) {
				this.setState({ likeStatus: true });
			}
		}
	}

	showBar = () =>
	this.setState({ showBar: true });

	hideBar = () =>
		this.setState({ showBar: false });

	showFull = () =>
		this.setState({ fullView: true });

	hideFull = () =>
		this.setState({ fullView: false });

	likePhoto =() => {
		const {photo, user} = this.props;
		if (!this.state.likeStatus) {
			this.setState({ 
				likeStatus: true,
				likesCount: this.state.likesCount + 1 
			});
			api.photos.like({
				photo_id: photo._id,
				user_id: user.user_id
			});
		}
	}

	render() {
		const {showBar, fullView, likesCount, likeStatus} = this.state;
		const {photo} = this.props;

		console.log(likeStatus)
		
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
								<button>{likeStatus ? <img src={liked_icon} alt="Like it"/> : <img src={like_icon} alt="Like it"/>}</button>
								<button><img src={collection_icon} alt="Add to your collection"/></button>
							</div>
						</div>
					}		
				</div>
				{fullView &&
					<PhotoFull 
						photo={photo}
						close={this.hideFull}
						likesCount={likesCount}
						likeStatus={likeStatus}
						likePhoto={this.likePhoto}/>
				}
			</React.Fragment>
		);
	}
}
 
export default Photo;