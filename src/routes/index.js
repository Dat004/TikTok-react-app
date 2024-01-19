import { HeaderOnly } from '../layouts';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Live from '../pages/Live';
import Following from '../pages/Following';
import Upload from '../pages/Upload';
import Video from '../pages/DetailVideo';

import config from '../config';
import FullScreen from '../layouts/FullScreen';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.video, component: Video },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
