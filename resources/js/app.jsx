import "../js/echo";
import '../css/app.css';
import '../css/layout.css';
import './bootstrap';
import '../js/styles/global.css';

import { router } from '@inertiajs/react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#00C488',
    },
});

// resources/js/app.jsx, after Echo is initialized

router.on('before', (event) => {
    const socketId = window.Echo?.socketId();
    console.log('🔌 Socket ID:', socketId); // temp debug
    if (socketId) {
        event.detail.visit.headers['X-Socket-Id'] = socketId;
    }
});
