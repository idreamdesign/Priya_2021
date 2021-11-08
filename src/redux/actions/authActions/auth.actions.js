// import RequestService from '../../../api/Service';
// import Endpoints from '../../../api/Endpoints';
import * as Types from '../../root.types';

// Authentication Actions (Login, Register, Forgot Password, etc)

// Login Actions

export const storeRoleDetails = (roleDetails) => {
	console.log('RoleDetails:::::::>', roleDetails);
	return {
		type: Types.ROLE_SELECTED,
		payload: roleDetails
	};
};
