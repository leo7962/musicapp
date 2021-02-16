import React from 'react';
import { Grid } from 'semantic-ui-react';
import Routes from '../../routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './LoggedLayaout.scss';

export default function LoggedLayaout(props) {
    const { user } = props;

    console.log(props);
    return (
        <Router>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={3}>
                        <h2>MenuLeft</h2>
                    </Grid.Column>
                    <Grid.Column className="content" width={13}>
                        <h2>TopBar</h2>
                        <Routes />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <h2>Player</h2>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Router>
    );
}
