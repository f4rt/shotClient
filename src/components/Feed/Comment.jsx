import React,{Component} from 'react';

class Comment extends Component {
	state = {
		comment_time: ''
	}

	commentTime = () => {
		const {comment, serverDate} = this.props;
		let difference = (new Date(serverDate) - new Date(comment.date)) / 1000;
		if (difference < (60 * 60)) {
			this.setState({ comment_time: Math.round(difference / 60) + 'mins ago' });
		} 
		else if (difference < (60 * 60 * 24)) {
			this.setState({ comment_time: Math.round(difference / (60 * 60)) + 'h ago' });
		}
		else if (difference < (60 * 60 * 24 * 30)) {
			this.setState({ comment_time: Math.round(difference / (60 * 60 * 24)) + 'd ago' });
		}
		else if (difference < (60 * 60 * 24 * 30 * 365)) {
			this.setState({ comment_time: Math.round(difference / (60 * 60 * 24 * 30)) + 'm ago' });
		}
		else {
			this.setState({ comment_time: Math.round(difference / (60 * 60 * 24 * 30 * 365)) + 'y ago' });
		}
	}

	componentDidMount() {
		this.commentTime();
	}

	render() {
		const {comment} = this.props;
		const {comment_time} = this.state;

		return (
			<div className="comment">
					<div className="user">
					<div className="user__photo" style={{backgroundImage: 'url(' + comment.user_photo + ')'}}></div>
					<div className="user__info">
						<div className="name">{comment.username}</div>
						<div className="date">{comment_time}</div>
					</div>
				</div>
				<div className="comment__text">{comment.comment}</div>
			</div>
		)};
}
 
export default Comment;