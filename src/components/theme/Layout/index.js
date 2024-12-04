// src/theme/Layout/index.js

import React from 'react';
import OriginalLayout from '@theme-original/Layout';

export default function Layout(props) {
  return (
    <>
      <OriginalLayout {...props} />
      {/* Portal Root for React Portals */}
      <div id="modal-root"></div>
    </>
  );
}
