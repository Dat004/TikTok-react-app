import ActionsApp from '../../components/ActionsApp';
import ViewProfile from '../../components/ViewProfile';

function Profile({ children }) {
    return (
        <div style={{ height: '100%' }}>
            <ViewProfile>{children}</ViewProfile>
            <ActionsApp />
        </div>
    );
}

export default Profile;
