import React from 'react';

const gradientBg = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    padding: '60px 0',
};

const cardStyle = {
    maxWidth: 500,
    margin: '0 auto',
    padding: 32,
    background: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(76, 110, 245, 0.15)',
    backdropFilter: 'blur(4px)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
};

const headingStyle = {
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: 1,
    color: '#5a189a',
    marginBottom: 24,
    fontFamily: 'Montserrat, sans-serif',
    textAlign: 'center',
};

const labelStyle = {
    color: '#764ba2',
    fontWeight: 700,
    fontSize: 18,
    minWidth: 120,
    display: 'inline-block',
};

const dataStyle = {
    color: '#22223b',
    fontWeight: 500,
    fontSize: 18,
    marginLeft: 8,
    display: 'inline',
};

const linkStyle = {
    color: '#5a189a',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'color 0.2s',
};

const Credits = () => (
    <div style={gradientBg}>
        <div style={cardStyle} className='mt-5'>
            <h1 style={headingStyle}>✨ Credits ✨</h1>
            <div>
                <span style={labelStyle}>Created by:</span>
                <span style={dataStyle}>Adithya Kannam</span>
            </div>
            <div>
                <span style={labelStyle}>About Me:</span>
                <span style={dataStyle}>
                    <br />
                    I am a passionate web developer focused on building modern React applications.<br />
                    I enjoy learning new technologies and creating user-friendly interfaces.
                </span>
            </div>
            <div>
                <span style={labelStyle}>Contact:</span>
                <span style={dataStyle}>
                    <br />
                    GitHub:{' '}
                    <a
                        href="https://github.com/adithyakannam"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                        onMouseOver={e => (e.target.style.color = '#3c096c')}
                        onMouseOut={e => (e.target.style.color = '#5a189a')}
                    >
                        adithyakannam
                    </a>
                </span>
            </div>
            <div>
                <span style={labelStyle}>
                    Thank you.
                </span>
            </div>
        </div>
    </div>
);

export default Credits;