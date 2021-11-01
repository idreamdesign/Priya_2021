import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../../assets';
import SearchBar from '../../../../components/SearchBar';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/categoryStyles';
import appColors from '../../../../utils/appColors';
import { WIDTH } from '../../../../utils/constants';

export const OneToOneSubList = (props) => {
	return (
		<View style={{ ...basicStyles, flex: 0, height: undefined }}>
			<View style={{ marginTop: 10 }}>
				<ScrollView>
					{[ 1, 2, 3, 4, 5, 6, 7, 8 ].map((item, i) => {
						return (
							<TouchableOpacity
								style={{ ...styles.oneToOneCard, justifyContent: 'space-between' }}
								key={i}
							>
								<View style={{ flexDirection: 'row', width: '70%' }}>
									<Image
										style={styles.oneToOneImg}
										resizeMode="stretch"
										source={appImages.otherImages.ONETOONE}
									/>
									<View style={{ marginLeft: 10 }}>
										<Text style={styles.onetoOneTitle}>Form 6 science</Text>
										<Text style={styles.onetoOneDesc}>Form 6 science</Text>
										<Text style={styles.onetoOneDesc}>5 hour duration</Text>
									</View>
								</View>
								<TouchableOpacity
									style={styles.bookingBtn}
									onPress={() => props.navigation.navigate('OneToOneView')}
								>
									<Text style={styles.bookNowTxt}>Book now</Text>
								</TouchableOpacity>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OneToOneSubList);
