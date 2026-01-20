import React from 'react'; // Πρόσθεσε οπωσδήποτε το React

export const BackgroundLines = React.memo(() => {
    return (
        <div className="bg-lines-container">
            <svg width="100%" height="100%" xmlns="http://www.w3.org">
                {/* Γραμμή 1 */}
                <path d="M-100 100 Q 150 300 500 100 T 1200 400" className="animated-line" />
                {/* Γραμμή 2 */}
                <path d="M-100 500 Q 400 200 800 500 T 1500 200" className="animated-line line-delay" />
                {/* Γραμμή 3 */}
                <path d="M-100 800 Q 200 600 600 800 T 1300 600" className="animated-line line-delay-2" />
            </svg>
        </div>
    );
});
