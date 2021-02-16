import React from 'react';
import { Grid } from 'semantic-ui-react';
import Routes from '../../routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuLeft from '../../components/MenuLeft/MenuLeft';
import TopBar from '../../components/TopBar/TopBar';
import './LoggedLayaout.scss';

export default function LoggedLayaout(props) {
    const { user } = props;

    return (
        <Router>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuLeft user={user} />
                    </Grid.Column>
                    <Grid.Column className="content" width={13}>
                        <TopBar user={user} />
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