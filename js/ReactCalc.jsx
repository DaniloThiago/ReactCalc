var ReactCalcButton = React.createClass({
	render: function(){
		return (
			<button className={'reactcalc-button ' + this.props.className}>
				{this.props.label}
			</button>
		)
	}
});

var ReactCalcMenu = React.createClass({
	render: function(){
		return (
			<div>
				<button className='reactcalc-button-menu reactcalc-button-menu-close reactcalc-button'>&times;</button>
				<div className="reactcalc-menu">
					<button className='reactcalc-button-menu reactcalc-button'>&#9776;</button>
					<label>PADRÃO</label>
				</div>
			</div>
		)
	}
});

var ReactCalcScreen = React.createClass({

	calc: function(){
		if(event.keyCode>=42 && event.keyCode<=57 || (event.keyCode==13 || event.keyCode==61))
		{
			this.setState({
				value: 
					event.keyCode>=48 && event.keyCode<=57 || (event.keyCode==44 || event.keyCode==46)
				 	? this.state.value + String.fromCharCode(event.keyCode) 
				 	: String.fromCharCode(event.keyCode) 
			});
		}
	},

	componentDidMount: function(){
		window.addEventListener('keypress', this.onKeyPressHandler);
	},

	onKeyPressHandler: function(event){
		console.log(event.keyCode);
		this.calc();
	},

	getInitialState: function(){
		return {
			value: ""
		}
	},

	render: function(){
		return (
			<div className="reactcalc-screen">
				{this.state.value||0}
			</div>
		)
	}
});

var ReactCalc = React.createClass({

	onMove: false,
	moveInterval: null,
	componentDidMount: function(){
		React.findDOMNode(this.refs.calculatorMenu).addEventListener('mousedown', this.onMouseDownHandler);
		window.addEventListener('mouseup', this.onMouseUpHandler);
	},

	onMouseDownHandler: function(){
		window.addEventListener('mousemove', this.onMouseMoveHandler);
		this.onMove = true;
	},

	onMouseMoveHandler: function(event){
		if(!this.onMove) return;
		this.setState({
			top: event.pageY-30,
			left: event.pageX-160
		});
		
	},

	onMouseUpHandler: function(event){
		window.removeEventListener('mousemove', this.onMouseMoveHandler);
		this.onMove = false;
	},

	getInitialState: function(){
		return {
			top: 100,
			left: 100
		}
	},

	render: function() {
		return (
			<div style={{left:this.state.left, top: this.state.top}} className="reactcalc-container" >
					<ReactCalcMenu ref="calculatorMenu"/>
					<ReactCalcScreen ref="calculatorScreen"/>
					<ReactCalcButton label='٪'/>
					<ReactCalcButton label='&radic;'/>
					<ReactCalcButton label='x²'/>
					<ReactCalcButton label={'¹⁄ₓ'}/>
				<div className="reactcalc-numpad">					
					<ReactCalcButton label='CE'/>
					<ReactCalcButton label='C'/>
					<ReactCalcButton label='↩'/>
					<ReactCalcButton label='&divide;'/>
					<ReactCalcButton className="reactcalc-numbutton" label='7'/>
					<ReactCalcButton className="reactcalc-numbutton" label='8'/>
					<ReactCalcButton className="reactcalc-numbutton" label='9'/>
					<ReactCalcButton label='x'/>
					<ReactCalcButton className="reactcalc-numbutton" label='4'/>
					<ReactCalcButton className="reactcalc-numbutton" label='5'/>
					<ReactCalcButton className="reactcalc-numbutton" label='6'/>
					<ReactCalcButton label='-'/>
					<ReactCalcButton className="reactcalc-numbutton" label='1'/>
					<ReactCalcButton className="reactcalc-numbutton" label='2'/>
					<ReactCalcButton className="reactcalc-numbutton" label='3'/>
					<ReactCalcButton label='+'/>
					<ReactCalcButton label='&plusmn;'/>
					<ReactCalcButton className="reactcalc-numbutton" label='0'/>
					<ReactCalcButton label='‚'/>
					<ReactCalcButton label='='/>
				</div>
			</div>
		)
	}
});