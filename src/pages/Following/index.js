import { UserAuth } from '../../components/Store';
import ViewFollowing from '../../components/ViewFollowing';
import ActionsApp from '../../components/ActionsApp';
import ViewVideo from '../../components/ViewVideo';

function Following({ children }) {
    const { userAuth, tokenStr } = UserAuth();
    const CATEGORIES = 'following';

    return (
        <div style={{ height: '100%' }}>
            {userAuth && tokenStr ? (
                <ViewVideo type={CATEGORIES}>
                    {children}
                </ViewVideo>
            ) : (
                <ViewFollowing />
            )}
            <ActionsApp />
        </div>
    );
}

export default Following;
