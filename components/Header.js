import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes.js';

export default () =>{
    return(
        <Menu style = {{ marginTop : '10px' }}>
            <Link route="/">
                <a className="item">Virtual EVS</a>
            </Link>

            <Menu.Menu position = "right">
                <Link route="/register">
                    <a className="item">Register</a>
                </Link>

                <Link route="/vote/details">
                    <a className="item">Vote</a>
                </Link>
                <Link route="/admin">
                    <a className="item">Admin Panel</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}