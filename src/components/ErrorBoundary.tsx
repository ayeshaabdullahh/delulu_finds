import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFF8F5' }}>
          <div className="text-center px-4">
            <h1 className="font-display text-3xl font-semibold text-charcoal mb-4">
              Something went wrong
            </h1>
            <p className="text-muted text-sm mb-8 font-body">
              An unexpected error occurred. Please reload the page or try again.
            </p>
            <button
              onClick={() => { window.location.href = '/'; }}
              className="clay-button text-xs tracking-widest uppercase"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}