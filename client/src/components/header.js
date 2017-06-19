import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
    if(this.props.authenticated){
    return <li className='nav-item'>
        <Link to='/signout' className='nav-link'>
          Signout
        </Link>
      </li>
    } else {
      return [
        <li className='nav-item' key={1}>
         <Link to='/signin' className='nav-link'>
           Sign in
         </Link>
       </li>,
       <li className='nav-item' key={2}>
        <Link to='/signup' className='nav-link'>
          Sign up
        </Link>
      </li>
      ]

    }
  }

  render() {
    return(
      <nav className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
        <Link to='/' className='navbar-brand'>
          Redux Auth
        </Link>
           <ul className='navbar-nav'>
             {this.renderLinks()}
           </ul>

      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
