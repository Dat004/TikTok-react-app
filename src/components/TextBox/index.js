import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './TextBox.module.scss';

import { EmojiIcon } from '../CustomIcon';
import Button from '../Button';

const cx = classNames.bind(styles);

const DATA_EMOJIES = [
    {
        type: 'emoji',
        icon: '😂',
    },
    {
        type: 'emoji',
        icon: '🤣',
    },
    {
        type: 'emoji',
        icon: '😆',
    },
    {
        type: 'emoji',
        icon: '😏',
    },
    {
        type: 'emoji',
        icon: '🥲',
    },
    {
        type: 'emoji',
        icon: '🙂',
    },
    {
        type: 'emoji',
        icon: '🤯',
    },
    {
        type: 'emoji',
        icon: '🥶',
    },
    {
        type: 'emoji',
        icon: '😁',
    },
    {
        type: 'emoji',
        icon: '🤡',
    },
    {
        type: 'emoji',
        icon: '☠️',
    },
    {
        type: 'emoji',
        icon: '🐧',
    },
    {
        type: 'emoji',
        icon: '🥰',
    },
    {
        type: 'emoji',
        icon: '🙃',
    },
    {
        type: 'emoji',
        icon: '😭',
    },
    {
        type: 'emoji',
        icon: '🥶',
    },
    {
        type: 'emoji',
        icon: '😱',
    },
    {
        type: 'emoji',
        icon: '😶‍🌫️',
    },
    {
        type: 'emoji',
        icon: '🫥',
    },
    {
        type: 'emoji',
        icon: '🫡',
    },
    {
        type: 'emoji',
        icon: '😈',
    },
    {
        type: 'emoji',
        icon: '👿',
    },
    {
        type: 'emoji',
        icon: '👽',
    },
    {
        type: 'emoji',
        icon: '🤖',
    },
    {
        type: 'emoji',
        icon: '💀',
    },
    {
        type: 'emoji',
        icon: '😺',
    },
    {
        type: 'emoji',
        icon: '😸',
    },
    {
        type: 'emoji',
        icon: '😹',
    },
    {
        type: 'emoji',
        icon: '😻',
    },
    {
        type: 'emoji',
        icon: '😼',
    },
    {
        type: 'emoji',
        icon: '😽',
    },
    {
        type: 'emoji',
        icon: '🙀',
    },
    {
        type: 'emoji',
        icon: '😿',
    },
    {
        type: 'emoji',
        icon: '😾',
    },
    {
        type: 'emoji',
        icon: '🫶',
    },
    {
        type: 'emoji',
        icon: '👍',
    },
    {
        type: 'emoji',
        icon: '👎',
    },
    {
        type: 'emoji',
        icon: '🙈',
    },
    {
        type: 'emoji',
        icon: '👈',
    },
    {
        type: 'emoji',
        icon: '👉',
    },
    {
        type: 'emoji',
        icon: '🤟',
    },
    {
        type: 'emoji',
        icon: '🤛',
    },
    {
        type: 'emoji',
        icon: '😵‍💫',
    },
    {
        type: 'emoji',
        icon: '🤤',
    },
    {
        type: 'emoji',
        icon: '🫠',
    },
    {
        type: 'emoji',
        icon: '👦',
    },
    {
        type: 'emoji',
        icon: '👩',
    },
    {
        type: 'emoji',
        icon: '🧑',
    },
    {
        type: 'emoji',
        icon: '👨',
    },
    {
        type: 'emoji',
        icon: '👩‍🦱',
    },
    {
        type: 'emoji',
        icon: '🤷‍♀️',
    },
    {
        type: 'emoji',
        icon: '🤷',
    },
    {
        type: 'emoji',
        icon: '🤷‍♂️',
    },
    {
        type: 'emoji',
        icon: '🙎‍♀',
    },
];

const TextBox = forwardRef(
    (
        {
            className,
            onChange = () => {},
            onClick = () => {},
            onKeyDown = () => {},
            setTextValue = () => {},
            textValue = '',
            width,
            height,
            isBreakLine = false,
        },
        ref,
    ) => {
        const [isTableEmoji, setIsTableEmoji] = useState(false);
        const [isActiveTab, setIsActiveTab] = useState(false);

        useEffect(() => {
            if (ref) {
                const textLength = ref.current.value.length;
                ref.current.setSelectionRange(textLength, textLength);
            }
        }, [ref]);

        useEffect(() => {
            if (ref) {
                ref.current.focus();

                ref.current.style.height = 'auto';

                const scrollHeight = ref.current.scrollHeight;

                ref.current.style.height = scrollHeight + 'px';
            }
        }, [ref, textValue]);

        const handleSubmit = (e) => {
            e.preventDefault();
        };

        const handleToggleTableEmoji = () => {
            setIsTableEmoji((prev) => !prev);
            setIsActiveTab((prev) => !prev);
        };

        const handleSelectEmoji = (icon) => {
            ref.current.focus();

            setTextValue((prev) => `${prev + icon}`);
            setIsTableEmoji(false);
            setIsActiveTab(false);
        };

        return (
            <div style={{ width: width, height: height }} className={cx('wrapper-form', {
                [className]: className,
            })}>
                <form onSubmit={handleSubmit} className={cx('form-container')}>
                    <div className={cx('form-group')}>
                        <div className={cx('form-text')}>
                            <textarea
                                ref={ref}
                                placeholder="Add comments..."
                                className={cx('text-form')}
                                onKeyDown={(e) => onKeyDown(e)}
                                onChange={(e) => onChange(e)}
                                value={textValue}
                                rows={1}
                            />
                            <div className={cx('current-length')}>{`${textValue.length}`}/150</div>
                        </div>
                        <div className={cx('emoji-container')}>
                            <Button
                                onClick={handleToggleTableEmoji}
                                className={cx('emoji-btn', {
                                    active: isActiveTab,
                                })}
                            >
                                <EmojiIcon />
                            </Button>
                            {isTableEmoji && (
                                <div className={cx('group-emoji')}>
                                    <ul className={cx('list-emojies')}>
                                        {DATA_EMOJIES.map((items, index) => (
                                            <li
                                                onClick={() => handleSelectEmoji(items.icon)}
                                                key={index}
                                                className={cx('emoji-item')}
                                            >
                                                {items.icon}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <Button onClick={onClick} disabled={textValue ? false : true} className={cx('btn-post')}>
                        Post
                    </Button>
                </form>
            </div>
        );
    },
);

TextBox.propTypes = {
    className: PropTypes.string,
    textValue: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    setTextValue: PropTypes.func,
    isBreakLine: PropTypes.bool,
};

export default TextBox;

