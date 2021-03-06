class PitchList extends React.Component {
  constructor(){
    super()
    this.state = {
      pitches: []
    }
  }

  componentDidMount(){
    this.setState({
      pitches: this.props.pitches
    })
  }

  render(){
    return(
      <ul>
      {
        this.state.pitches.map((pitch, idx) => {
          return (<Pitch key={idx} data={pitch} phase={this.props.phase} subset={this.props.subset} />)
        })
      }
      </ul>
    )
  }
}
