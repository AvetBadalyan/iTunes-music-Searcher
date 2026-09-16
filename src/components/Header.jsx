import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<Link
			to="/"
			className="header"
			aria-label="iTunes Music Searcher home"
		>
			<i
				className="fa-brands fa-apple"
				aria-hidden="true"
			></i>
			<span>Music</span>
		</Link>
	)
}
