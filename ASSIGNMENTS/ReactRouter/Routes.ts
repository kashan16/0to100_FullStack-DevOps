import { About } from './components/About';
import { Contact } from './components/Contact';
import { Home } from './components/Home';

type Routes = {
    path : string;
    component : React.ComponentType;
    isProtected ?: boolean;
}

const routes : Routes[] = [
    {
        path : '/',
        component : Home,
    },
    {
        path : '/about',
        component : About,
    },
    {
        path : '/contact',
        component : Contact,
    },
]

export default routes;