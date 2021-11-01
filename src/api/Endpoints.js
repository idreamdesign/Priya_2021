const Endpoints = {
	//Login
	LOGIN: 'api_login_details', //comp

	//Register
	SIGNUP: 'register_details_api', //comp
	NRIC_CHECK: 'member_nric_check/', //comp
	PERSONAL_UPDATE: 'update_details_api', //comp

	//Forgot Password
	FORGOT_PASSWORD: 'forgot_password_code_mail', //comp
	RESET_PASSWORD: 'forgot_password_update', //comp
	//Post lists
	TIMELINE: 'timeline_admin_user_friend_post', //comp
	HQ_POST: 'admin_post', //comp
	USER_POSTS: 'users_posts', //comp

	//Friends list
	SUGGESTED_LIST: 'suggested_list', //comp
	FOLLOWERS: 'followers_list', //comp
	FOLLOWING: 'following_list', //comp
	MEMBER_DETAILS: 'social_member_details', //comp

	MEMBER_FRIEND_DETAILS: 'social_friend_relationship', //comp
	FOLLOW_REQUEST: 'follow_request_accept', //new

	//Comment Api
	COMMENT_SECTION: 'comment_section', //comp
	ADD_COMMENT: 'add_post_comment', //comp
	ADD_REPLY_COMMENT: 'reply_add_comment', //comp

	//Action Section
	LIKE_POST: 'add_likes', //comp
	EMAIL_CHECK: 'email_existance_check', //new
	MEMBER_STATEMENT: 'member_statement', //comp
	FOLLOW_UNFOLLOW: 'add_follow_unfollow', //new
	UPDATE_PROFILE: 'update_profile_photo', //new
	UPDATE_COVER: 'cover_image_update', //new
	ADD_POST_MULTIPLE: 'add_multiple_image', //comp
	ADD_POST: 'add_post', //comp
	COUNTRY: 'Country_details', //comp
	STATE_LIST: 'state_details', //comp
	CITY_LIST: 'city_details', //comp
	VIDEO_UPLOAD: 'video_upload', //comp

	//Chat Section
	CHAT_LIST: 'user_message_list', //comp
	CONVERSATION_LIST: 'user_messages', //comp
	ADD_MESSAGE: 'user_add_message', //comp

	//notification
	NOTIFICATION_LIST: 'notifications_list', //comp

	//postview
	POST_DETAILS: 'post_details' //comp
};

export default Endpoints;
