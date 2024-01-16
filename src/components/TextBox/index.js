import classNames from 'classnames/bind';
import styles from './TextBox.module.scss';
import Button from '../Button';
import { EmojiIcon } from '../CustomIcon';
import { forwardRef, useEffect, useRef, useState } from 'react';

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
            isBreakLine = false,
        },
        ref,
    ) => {
        const [isTableEmoji, setIsTableEmoji] = useState(false);
        const [isActiveTab, setIsActiveTab] = useState(false);

        useEffect(() => {
            if (ref.current) {
                const textLength = ref.current.value.length;
                ref.current.setSelectionRange(textLength, textLength);
            }
        }, []);

        useEffect(() => {
            if (ref) {
                ref.current.focus();

                ref.current.style.height = 'auto';

                const scrollHeight = ref.current.scrollHeight;

                ref.current.style.height = scrollHeight + 'px';
            }
        }, [textValue]);

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
            <div className={cx('wrapper-form')}>
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
                            <div className={cx('current-length')}>{textValue.length + '/' + '150'}</div>
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

export default TextBox;
