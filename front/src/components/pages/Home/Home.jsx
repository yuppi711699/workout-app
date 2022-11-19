import React from 'react'
import Header from '../../common/Header/Header.jsx'
import Button from '../../ui/Button/Button.jsx'
import Counters from '../../ui/Counters/Counters.jsx'
import styles from './Home.module.scss'

const Home = () => {
	return (
		<div className={styles['home-wrapper']}>
			<Header />
			<div>Home page</div>
			<Button text='New' style='main' callback={() => {}} />
			<h1 className={styles.heading}> Exercises for Shoulderss</h1>
			<Counters />
		</div>
	)
}

export default Home
