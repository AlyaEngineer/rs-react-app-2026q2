import { Component } from 'react';

import type { ErrorTestButtonState } from '@/app/model/errorBoundaryTypes';

class ErrorTestButton extends Component<object, ErrorTestButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { shouldThrow: false };
  }

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('ErrorBoundary caught an error');
    }

    return (
      <button
        onClick={this.handleClick}
        className="bg-destructive/10 hover:bg-button-error-hover flex w-1/4 cursor-pointer items-center justify-center gap-2.5 rounded-2xl p-2 text-gray-600 shadow-xl inset-shadow-sm transition delay-150 duration-300 ease-in-out text-shadow-2xs hover:shadow-xl/20 max-md:w-full"
      >
        Click me to trigger the error
      </button>
    );
  }
}

export default ErrorTestButton;
