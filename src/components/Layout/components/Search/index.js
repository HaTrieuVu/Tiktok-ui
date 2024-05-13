import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '~/hooks';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { faXmarkCircle, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as searchServices from '~/apiServecis/searchServices';

import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const refInput = useRef();

    const hanldeClear = () => {
        setSearchValue('');
        setSearchResult([]);
        refInput.current.focus();
    };

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchAPI = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced); // lấy được dữ liệu từ api đưa vào mảng để render
            setSearchResult(result);

            setLoading(false);
        };

        fetchAPI();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const hanldeHideResult = () => {
        setShowResult(false);
    };

    return (
        <>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-tittle')}>Accounts</h4>
                            {searchResult.map((result) => {
                                // console.log(result);
                                return <AccountItem key={result.id} data={result} />;
                            })}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={hanldeHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={refInput}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        onFocus={() => setShowResult(true)}
                    />
                    {/* !!searchValue convert sang boolean */}
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={hanldeClear}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </>
    );
}

export default Search;
