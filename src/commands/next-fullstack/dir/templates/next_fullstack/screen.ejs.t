/**
 * @file <%= name %>.tsx
 * @author <%= author %>
 * File ini di-generate secara otomatis.
 */

import React from 'react';

interface <%= name %>Props { }

const <%= name %>Screen: React.FC <<%= name %>Props > = () => {
    return (
        <div>
            <h1>Hello from <%= name %>!</h1>
        </div>
    );
};

export default <%= name %>Screen;
