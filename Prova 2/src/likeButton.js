'use strict';

const e = React.createElement;

class likeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'Hai Cliccato!.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'CLICCA'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(likeButton));


$(document).ready(function(){
  //        $('#saluto').hide();
      });

     

      $('#btn1').click(function(){
          $('#saluto').toggle();

      });

