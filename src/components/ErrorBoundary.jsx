import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: null }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error }
	}

	componentDidCatch(error, errorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<div className="error-boundary__content">
						<i
							className="fa-solid fa-triangle-exclamation fa-3x"
							aria-hidden="true"
						></i>
						<h1>Something went wrong</h1>
						<p>We're sorry, but an unexpected error occurred.</p>
						<Link
							to="/"
							className="btn btn--primary"
							onClick={() => this.setState({ hasError: false })}
						>
							Back to Home
						</Link>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}
