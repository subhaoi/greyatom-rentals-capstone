import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class EntryPage extends React.Component {

    render() {
        return (
            <div className="col-md-8 pull-right">
                <Link to="/login" className="btn btn-secondary">Login</Link>
                &nbsp;
                <Link to="/register" className="btn btn-secondary">Register</Link>
                </div>
        );
    }
}

const connectedEntryPage = EntryPage;
export { connectedEntryPage as EntryPage };