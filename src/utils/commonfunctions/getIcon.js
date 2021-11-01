import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getIcon = (type, name, style, size, color) => {
	switch (type) {
		case 'ad':
			return <AntDesign name={name} color={color && color} style={style ? style : {}} size={size} />;
		case 'et':
			return <Entypo name={name} color={color && color} style={style ? style : {}} size={size} />;
		case 'fr':
			return <Feather name={name} color={color && color} style={style ? style : {}} size={size} />;
		case 'fa':
			return <FontAwesome name={name} color={color && color} style={style ? style : {}} size={size} />;
		case 'fa5':
			return <FontAwesome5 name={name} color={color && color} style={style ? style : {}} size={size} />;
		case 'fot':
			return <Fontisto name={name} color={color && color} style={style ? style : {}} size={size} />;
		case 'fd':
			return <Foundation name={name} color={color && color} style={style ? style : {}} size={size} />;
		case 'ion':
			return <Ionicons name={name} color={color && color} style={style ? style : {}} size={size} />;
		case 'mc':
			return <MaterialCommunityIcons color={color && color} name={name} style={style ? style : {}} size={size} />;
		case 'mi':
			return <MaterialIcons color={color && color} name={name} style={style ? style : {}} size={size} />;
		case 'oi':
			return <Octicon color={color && color} s name={name} style={style ? style : {}} size={size} />;
		case 'si':
			return <SimpleLineIcons color={color && color} name={name} style={style ? style : {}} size={size} />;

		default:
			return null;
	}
};

export default getIcon;

const styles = StyleSheet.create({});
