import React, { Component } from 'react';
import like_icon from './like_icon.svg';
import liked_icon from './liked_icon.svg';
import collection_icon from './collection_icon.svg';

class PhotoFull extends Component {
	state = {

	}
	
	render() {
		const {photo, likesCount, likeStatus, likePhoto} = this.props

		return (
			<div className="fullview-container">
				<div className="fullview">
					<div className="fullview__photo" style={{ width: photo.photo_url ? 'auto' : '75%'}}>
						<img src={photo.photo_url} alt=""/>
					</div>
					<div className="fullview__info">
						<div className="author">
							<div className="author__photo" style={{ backgroundImage: 'url(' + photo.author_photo + ')' }}></div>
							<div className="author__name">
								<div className="name">{photo.author_name}</div>
								<div className="category">in {photo.category}</div>
							</div>
						</div>
						<div className="buttons-bar">
							<button className={likeStatus ? "like liked" : "like"} onClick={likePhoto}>
								{likeStatus ? <img src={liked_icon} alt=""/> : <img src={like_icon} alt=""/>}
								{likesCount}
							</button>
							<button className="collection">
								<img src={collection_icon} alt=""/>
								Add to collection
							</button>
						</div>
						<div className="title-description">
							<p className="title">{photo.title}</p>
							<p className="description">{photo.description}</p>
						</div>
						<div className="comments">
							<div className="section-title">Comments</div>
							<div className="comments-section">No comments yet</div>
						</div>
						<div className="main-close">
							<button className="close" onClick={this.props.close}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
 
export default PhotoFull;