import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../../assets';
import SearchBar from '../../../../components/SearchBar';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/categoryStyles';
import appColors from '../../../../utils/appColors';
import { WIDTH } from '../../../../utils/constants';

export const GroupClass = (props) => {
	return (
		<View style={{ ...basicStyles, flex: 0, height: undefined }}>
			<View style={{ marginTop: 10 }}>
				<SearchBar
					placeHolder="Seach subject or class"
					style={{ height: 50, borderColor: appColors.placeHolderGrey }}
				/>
				<ScrollView>
					{[ 1, 2, 3, 4, 5, 6, 7, 8 ].map((item, i) => {
						return (
							<TouchableOpacity
								onPress={() => props.navigation.navigate('GroupSubList')}
								style={styles.oneToOneCard}
								key={i}
							>
								<Image
									style={{ ...styles.oneToOneImg, height: 60 }}
									resizeMode="stretch"
									source={appImages.otherImages.ONETOONE}
								/>
								<View style={{ marginLeft: 10 }}>
									<Text style={styles.onetoOneTitle}>class subject or title</Text>
									<Text style={styles.onetoOneDesc}>10 chapter</Text>
								</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupClass);
