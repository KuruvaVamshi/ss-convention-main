import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL REACT APP ERROR:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#1C0409',
          color: '#FAF6F0',
          padding: '40px 24px',
          fontFamily: 'monospace',
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '12px',
            padding: '24px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }}>
            <h1 style={{ color: '#FFE57F', fontSize: '20px', marginBottom: '16px' }}>
              Application Render Notice
            </h1>
            <p style={{ color: '#FFB4B4', marginBottom: '16px' }}>
              {String(this.state.error?.message || this.state.error)}
            </p>
            {this.state.error?.stack && (
              <pre style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '16px',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '12px',
                color: '#EAD8B2',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error.stack}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#7A1F31',
                color: '#FFE57F',
                border: '1px solid #D4AF37',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    console.error('Fatal initialization error:', err);
    rootElement.innerHTML = `
      <div style="min-height: 100vh; background: #1C0409; color: #FFB4B4; padding: 32px; font-family: monospace;">
        <h2 style="color: #FFE57F;">Root Mount Failure</h2>
        <pre style="white-space: pre-wrap;">${err?.stack || String(err)}</pre>
      </div>
    `;
  }
}
