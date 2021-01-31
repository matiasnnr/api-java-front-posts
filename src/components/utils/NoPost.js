import React from 'react';
import empty from '../../assets/empty.svg';

export default function NoPost({ noPostText }) {
    return (
        <div className="empty__component">
            <div className="empty__component-content">
                <object data={empty} type="image/svg+xml">
                    Error al cargar imagen SVG
                </object>
                <p>{noPostText}</p>
            </div>
        </div>
    )
}
