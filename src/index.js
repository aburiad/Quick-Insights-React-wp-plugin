import React from 'react';
import { render } from 'react-dom';
import App from '../main';



document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById('my-custom-menu-root');
    if (rootElement) {
        render(<App/>, rootElement);
    }
});
