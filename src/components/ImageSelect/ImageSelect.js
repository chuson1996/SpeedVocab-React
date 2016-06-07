import React, {PropTypes, Component} from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';
import Image from 'react-bootstrap/lib/Image';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class ImageSelect extends Component {
	static propTypes = {
		images: PropTypes.array.isRequired,
		onImageSelected: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			activePage: 1
		};
	}

	handleSelect(event, {eventKey}) {
		this.setState({
			activePage: eventKey
		});
	}

	render() {
		const {images, onImageSelected} = this.props;
		const pagesNo = images.length / 6;
		const activeImages = images.slice(this.state.activePage, this.state.activePage + 6).map((image, index) => {
			return (
				<Col xs={6} md={3} key={index}>
					<Image
						style={{maxWidth: '100%'}}
						src={image}
						rounded
						onClick={() => onImageSelected(image)} />
				</Col>
			);
		});

		return (
			<div>
				<Pagination
					bsStyle="large"
					items={pagesNo}
					activePage={this.state.activePage}
					onSelect={this.handleSelect.bind(this)} />
				<Row>
					{activeImages}
				</Row>
			</div>
		);
	}
}
