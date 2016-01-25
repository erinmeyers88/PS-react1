var Button = React.createClass({
	
	localHandleClick: function () {
		this.props.localHandleClick(this.props.increment);
	},
	
	render: function () {
		return (
			<button onClick={this.localHandleClick}>+{this.props.increment}</button>
		)
	}
});

var Result = React.createClass({
	render: function () {
		return (
			<div>{this.props.localCounter}</div>
		)
	}
});


var Card = React.createClass ({
	getInitialState: function () {
		return {}
	},
	componentDidMount: function () {
		
		var component = this;
		
		$.get("http://swapi.co/api/people/" + this.props.num + "/" , function (data) {
			component.setState(data);
		});	
	},
	render: function () {
		return (
			<div>
				<h3>{this.state.name}</h3>
				<h4>{this.state.birth_year}</h4>
				<hr/>
			</div>
		)
	}
});

var Form = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var loginInput = ReactDOM.findDOMNode(this.refs.num);
		this.props.addCard(loginInput.value);
		loginInput.value = "";
	},
	render: function () {
		return (
			<form onSubmit={this.handleSubmit}>
				<input placeholder="type a number" ref="num"/>
				<button>Add</button>
			</form>
		)
	}
})

var Main = React.createClass({
	getInitialState: function () {
		return {counter: 0, nums: ['1', "2", "3"]};
	},
	handleClick: function (increment) {
		this.setState({counter: this.state.counter+increment});	
	},
	addCard: function (numToAdd) {
		this.setState({nums: this.state.nums.concat(numToAdd)});
	},
	render: function () {
		
		var cards = this.state.nums.map(function (num) {
			return (<Card num={num} key={num}/>)
		})
		
		return (
			<div>
				<Button localHandleClick={this.handleClick} increment={1}/>
				<Button localHandleClick={this.handleClick} increment={5}/>
				<Button localHandleClick={this.handleClick} increment={10}/>
				<Button localHandleClick={this.handleClick} increment={100}/>
				<Result localCounter={this.state.counter}/>
				<hr></hr>
				<Form addCard={this.addCard} />
				{cards}
				
			</div>
		)
	}
})


ReactDOM.render(<Main />, document.getElementById("root"));