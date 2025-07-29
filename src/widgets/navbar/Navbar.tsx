import block from 'bem-css-modules';
import { Link } from 'react-router';

import styles from './Navbar.module.scss';

const b = block(styles, 'Navbar');

export function Navbar() {
    return (
        <nav className={b()}>
            <ul className={b('list')}>
                <li className={b('item')}>
                    <Link to="/tokens">#tokens</Link>
                </li>
                <li className={b('item')}>
                    <Link to="/ast">#ast</Link>
                </li>
            </ul>
        </nav>
    );
}
