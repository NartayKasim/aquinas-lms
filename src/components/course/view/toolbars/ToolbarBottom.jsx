import React from 'react';
import { useState } from 'react';

export default function ToolbarBottom(props) {
    const [showScroll, setShowScroll] = useState(false)
    const { showModal } = props;

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="toolbar--bottom">
            <div className="toolbar--bottom--inner">
                <div className="bottom-bar--options" onClick={() => scrollTop()}>Back to Top</div>
                <div className="bottom-bar--options" onClick={() => showModal()}>Add New Unit</div>
                <div className="bottom-bar--options">Manage Course</div>
                <div className="bottom-bar--options">Publish Course</div>
            </div>
        </div>
    )
}
