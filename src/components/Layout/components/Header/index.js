import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXmarkCircle,
    faSpinner,
    faMagnifyingGlass,
    faSignIn,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faCloudUpload,
    faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <img src={images.languageIcon} alt="logo"></img>,
        title: 'Language',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <img src={images.feedbackIcon} alt="logo"></img>,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <img src={images.keyboardIcon} alt="logo"></img>,
        title: 'Keybroad shortcuts',
    },
];

const handleMenuChange = (item) => {
    console.log(item);
};

function Header() {
    const currentUser = true;

    const [searchResult, setSearchResult] = useState([]);

    const useMenu = [
        {
            icon: <img src={images.userIcon} alt="logo"></img>,
            title: 'View profile',
            to: '/@rosé',
        },
        {
            icon: <img src={images.coin} alt="logo"></img>,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <img src={images.settingIcon} alt="logo"></img>,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <img src={images.logoutIcon} alt="logo"></img>,
            title: 'Log out',
            to: '/',
            separate: true,
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 3000);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo"></img>
                </div>
                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-tittle')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

                {/* action */}
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy trigger="click" content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                </button>
                            </Tippy>
                            <Tippy content="Messages" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary leftIcon={<FontAwesomeIcon icon={faSignIn} />}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? useMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <img
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/856d6e040a2b3181553f302cdef7f5f5.jpeg?lk3s=a5d48078&x-expires=1715410800&x-signature=YL3qGHgMQ2hD%2Fnh1DLmXEGjQyI0%3D"
                                alt="rose"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
