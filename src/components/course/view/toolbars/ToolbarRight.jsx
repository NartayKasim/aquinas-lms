import React from 'react';
import { useState } from 'react';

export default function ToolbarRight(props) {
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
        <div className="toolbar--right">


            {
                showScroll
                    ?
                    <div className="toolbar--right--inner">
                        <div className="options-circle" onClick={() => scrollTop()}>/\</div>
                        <span>Back To Top</span>
                    </div>
                    :
                    null
            }


            <div className="toolbar--right--inner" onClick={() => showModal()}>
                <div className="options-circle">+</div>
                <span>Add New Unit</span>
            </div>

            <div className="toolbar--right--inner">
                <div className="options-circle">M</div>
                <span>Manage Course</span>
            </div>
            <div className="toolbar--right--inner">
                <div className="options-circle">P</div>
                <span>Publish Course</span>
            </div>
        </div>
    )
}
