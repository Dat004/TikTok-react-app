import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    {publicRoutes.map((items, index) => {
                        const Layout = items.layout === null ? Fragment : items.layout || DefaultLayout;
                        const Page = items.component;

                        return (
                            <Route
                                key={index}
                                path={items.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
