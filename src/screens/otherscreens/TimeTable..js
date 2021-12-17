import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/timeTableStyles';
import getIcon from '../../utils/commonfunctions/getIcon';

export const TimeTable = (props) => {
	const [ containerSize, setContainerSize ] = React.useState(0);

	return (
		<View style={basicStyles.container}>
			{[ 1, 2, 3, 4 ].map((el, i) => {
				return (
					<View style={styles.timeTableCard} key={i}>
						<View style={styles.timeTableIcon}>{getIcon('ad', 'table', { alignSelf: 'center' }, 70)}</View>
						<View
							style={styles.timetableTextContainer}
							onLayout={(layoutEvent) => setContainerSize(layoutEvent.nativeEvent.layout.width)}
						>
							<Text style={styles.timeTableTitle}>
								Form 5 Chemistry - REVERSIBLE REACTIONS EQUILIBRIA
							</Text>
							<Text>Monday</Text>
							<Text>4.30 PM, 29-05-2021</Text>
						</View>
					</View>
				);
			})}
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
