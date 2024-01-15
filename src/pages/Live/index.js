import ViewLive from '../../components/ViewLive';

function Live({ children }) {
    return (
        <div style={{ height: '100%' }}>
            <ViewLive>{children}</ViewLive>
        </div>
    );
}

export default Live;
