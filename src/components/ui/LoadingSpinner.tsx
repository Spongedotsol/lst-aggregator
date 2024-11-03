import React from 'react';

const LoadingSpinner: React.FC = () => {
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: "100vw",
    height: "100vh",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: semi-transparent background
    zIndex: 9999, // Ensure it appears above other content
  };

  const spinnerStyle: React.CSSProperties = {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTop: '4px solid #fff',
    width: '80px',
    height: '80px',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={overlayStyle}>
      <div style={spinnerStyle}>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingSpinner;