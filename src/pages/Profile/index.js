import ViewProfile from "../../components/ViewProfile";

function Profile({ children }) {
    return <div style={{ height: '100%' }}>
        <ViewProfile>
            { children }
        </ViewProfile>
    </div>
}

export default Profile;
