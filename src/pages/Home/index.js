import ActionsApp from '../../components/ActionsApp';
import ViewVideo from '../../components/ViewVideo';

function Home() {
    const CATEGORIES = 'for-you';

    return (
        <div style={{ height: '100%' }}>
            <ViewVideo type={CATEGORIES} />
            <ActionsApp />
        </div>
    );
}

export default Home;
