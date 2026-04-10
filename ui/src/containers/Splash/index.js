import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { login } from '../../actions/loginActions';
import logo from '../../assets/imgs/logo_banner.png';

const ACCENT = '#208692';
const ACCENT_RGB = '32,134,146';

const useStyles = makeStyles(() => ({
	root: {
		position: 'fixed',
		inset: 0,
		zIndex: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: "'Oswald', sans-serif",
		cursor: 'pointer',
		userSelect: 'none',
		background: 'transparent',
	},
	card: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '32px 24px',
		animation: '$cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
		minWidth: 520,
		maxWidth: 680,
		borderRadius: 16,
	},
	welcomeLabel: {
		display: 'block',
		textAlign: 'center',
		fontFamily: "'Oswald', sans-serif",
		fontSize: 'clamp(15px, 1.35vw, 28px)',
		fontWeight: 600,
		letterSpacing: '0.35em',
		textTransform: 'uppercase',
		color: 'rgba(255,255,255,0.85)',
		marginBottom: 28,
		textShadow: '0 2px 14px rgba(0,0,0,0.75)',
	},
	logo: {
		width: '100%',
		maxWidth: 420,
		marginBottom: 40,
		filter: `drop-shadow(0 0 24px rgba(${ACCENT_RGB},0.5))`,
		animation: '$logoGlow 3s ease-in-out infinite alternate',
	},
	promptRow: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	promptText: {
		fontFamily: "'Oswald', sans-serif",
		fontSize: 'clamp(13px, 1.15vw, 22px)',
		fontWeight: 500,
		letterSpacing: '0.18em',
		textTransform: 'uppercase',
		color: 'rgba(255,255,255,0.65)',
		textShadow: '0 1px 12px rgba(0,0,0,0.8)',
		animation: '$promptBlink 2s ease-in-out infinite',
		whiteSpace: 'nowrap',
		'& span': {
			color: ACCENT,
			fontWeight: 700,
			padding: '4px 10px',
			border: `1px solid rgba(${ACCENT_RGB},0.5)`,
			borderRadius: 12,
			background: `rgba(${ACCENT_RGB},0.1)`,
			marginLeft: 5,
			marginRight: 5,
			letterSpacing: '0.05em',
		},
	},
	'@keyframes cardReveal': {
		'0%': { opacity: 0, transform: 'translateY(30px) scale(0.97)' },
		'100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
	},
	'@keyframes logoGlow': {
		'0%': { filter: `drop-shadow(0 0 16px rgba(${ACCENT_RGB},0.4))` },
		'100%': { filter: `drop-shadow(0 0 36px rgba(${ACCENT_RGB},0.75))` },
	},
	'@keyframes promptBlink': {
		'0%, 100%': { opacity: 1 },
		'50%': { opacity: 0.4 },
	},
}));

export default () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [show, setShow] = useState(true);

	const onAnimEnd = () => {
		dispatch(login());
	};

	const handleInput = (e) => {
		if (e.which == 1 || e.which == 13 || e.which == 32) {
			setShow(false);
		}
	};

	useEffect(() => {
		if (!show) return undefined;
		['click', 'keydown', 'keyup'].forEach((ev) =>
			window.addEventListener(ev, handleInput),
		);
		return () => {
			['click', 'keydown', 'keyup'].forEach((ev) =>
				window.removeEventListener(ev, handleInput),
			);
		};
	}, [show]);

	return (
		<div
			className={classes.root}
			style={{
				pointerEvents: show ? 'auto' : 'none',
				cursor: show ? 'pointer' : 'default',
			}}
		>
			<Fade in={show} onExited={onAnimEnd} timeout={500}>
				<div className={classes.card}>
					<span className={classes.welcomeLabel}>Welcome to</span>
					<img className={classes.logo} src={logo} alt="Mythic Framework" />
					<div className={classes.promptRow}>
						<span className={classes.promptText}>
							Press <span>ENTER</span> / <span>SPACE</span> /{' '}
							<span>CLICK</span> to continue
						</span>
					</div>
				</div>
			</Fade>
		</div>
	);
};
