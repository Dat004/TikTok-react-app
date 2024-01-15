import ViewVideo from '../../components/ViewVideo';

function Home({ children }) {
    const CATEGORIES = 'for-you';

    return (
        <div style={{ height: '100%' }}>
            <ViewVideo type={CATEGORIES}>{children}</ViewVideo>
        </div>
    );
}

export default Home;
