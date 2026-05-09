import { Component } from 'react';

import type { ErrorTestButtonState } from '../model/errorBoundaryTypes';

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
        className="bg-destructive/10 flex w-1/4 items-center justify-center gap-2.5 p-2 max-md:w-full cursor-pointer rounded-2xl shadow-xl inset-shadow-sm text-gray-600 text-shadow-2xs transition delay-150 duration-300 ease-in-out hover:bg-button-error-hover hover:shadow-xl/20"
      >
        Click me to trigger the error
      </button>
    );
  }
}

export default ErrorTestButton;
