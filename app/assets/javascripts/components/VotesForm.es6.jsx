class VotesForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.boxes = []
  }

  handleChange(event) {
    if ((this.boxes.filter((box) => box.checked).length > this.props.votecount) && event.target.checked) {
      event.preventDefault()
      event.target.checked = false
      alert(`You can only choose ${this.props.votecount}`)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    votes = this.boxes.filter((box) => box.checked).map((box) => box.name)
    if (votes.length < this.props.votecount) {
      return alert(`Please select ${this.props.votecount} choices`)
    }
    $.ajax({
      url: event.target.action,
      method: event.target.method,
      data: {votes: votes}
    }).done((response) => console.log(response))
  }

  render() {
    return (
      <form action="/votes" method="post" onSubmit={this.handleSubmit}>
        {this.props.pitches.map((pitch) => <label onChange={this.handleChange} key={pitch.id}>{pitch.title}<input key={pitch.id} ref={(self) => this.boxes.push(self)} type="checkbox" name={pitch.title} /></label>)}
        <button value="submit" type="submit"/>
      </form>
    )
  }
}
