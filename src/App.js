import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';

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
