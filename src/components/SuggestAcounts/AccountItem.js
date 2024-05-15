import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './SuggestedAccounts.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('account-item')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/eb31adc70b18cefec9d88ade73d36e57.jpeg?lk3s=a5d48078&nonce=71870&refresh_token=98aea645896e61e71f914bf7b2068023&x-expires=1715947200&x-signature=QwzxpCznRRdr39RIvoUGXqT3hU8%3D&shp=a5d48078&shcp=b59d6b55"
                alt=""
            />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>HHHH</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>asddddd</p>
            </div>
        </div>
    );
}

export default AccountItem;
