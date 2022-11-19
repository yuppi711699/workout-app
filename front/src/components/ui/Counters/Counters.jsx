import React from 'react'
import styles from './Counters.module.scss'

const counters = {
	minutes: 5,
	workouts: 9,
	kgs: 11,
}

const Counters = () => {
	return (
		<div className={styles.wrapper}>
			{Object.entries(counters).map(item => (
				<div className={styles.count} key={'_key_' + item[0]}>
					<div className={styles.heading}>
						{item[0]}: {item[1]}
					</div>
					<div className={styles.number}>{item[1]}</div>
				</div>
			))}
		</div>
	)
}
export default Counters
