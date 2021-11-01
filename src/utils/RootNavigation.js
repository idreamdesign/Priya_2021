import React from 'react';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
    navigationRef.current?.navigate(name, params);
};

export const navigateDispatch = root => {
    navigationRef.current?.dispatch(root);
};