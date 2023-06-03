import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ContactList from './components/ContactList.jsx';

const router = createBrowserRouter([{
    path: '/',
    element: <ContactList />,
}])

export default router;
