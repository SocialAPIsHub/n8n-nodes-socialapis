import type { INodeProperties } from 'n8n-workflow';

export const instagramProfileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['instagramProfile'] } },
		options: [
			{
				name: 'Get Highlight Details',
				value: 'igGetHighlightDetails',
				action: 'Get instagram highlight details',
				description: 'Get the stories inside a highlight',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/highlight/details',
						qs: { highlight_id: '={{$parameter.igHighlightId}}' },
					},
				},
			},
			{
				name: 'Get Profile Details',
				value: 'igGetProfileDetails',
				action: 'Get instagram profile details',
				description: 'Get bio, follower and post counts, verification and related profiles',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/profile/details',
						qs: { username: '={{$parameter.igUsername}}' },
					},
				},
			},
			{
				name: 'Get Profile Highlights',
				value: 'igGetProfileHighlights',
				action: 'Get instagram profile highlights',
				description: 'List highlights with cover images and titles',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/profile/highlights',
						qs: { user_id: '={{$parameter.igUserId}}' },
					},
				},
			},
			{
				name: 'Get Profile Posts',
				value: 'igGetProfilePosts',
				action: 'Get instagram profile posts',
				description: 'Get posts from a profile. Use End Cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/profile/posts',
						qs: { username: '={{$parameter.igUsername}}' },
					},
				},
			},
			{
				name: 'Get Profile Reels',
				value: 'igGetProfileReels',
				action: 'Get instagram profile reels',
				description: 'Get reels with play counts and audio metadata. Use End Cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/profile/reels',
						qs: { user_id: '={{$parameter.igUserId}}' },
					},
				},
			},
			{
				name: 'Get User ID',
				value: 'igGetUserId',
				action: 'Get an instagram user ID',
				description: 'Get the numeric user ID for a username',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/user/id',
						qs: { username: '={{$parameter.igUsername}}' },
					},
				},
			},
		],
		default: 'igGetProfileDetails',
	},
	{
		displayName: 'Username',
		name: 'igUsername',
		type: 'string',
		required: true,
		placeholder: 'nike',
		description: 'Instagram username, without the @',
		default: '',
		displayOptions: {
			show: { operation: ['igGetUserId', 'igGetProfileDetails', 'igGetProfilePosts'] },
		},
	},
	{
		displayName: 'User ID',
		name: 'igUserId',
		type: 'string',
		required: true,
		description: 'Numeric Instagram user ID (from Get User ID)',
		default: '',
		displayOptions: { show: { operation: ['igGetProfileReels', 'igGetProfileHighlights'] } },
	},
	{
		displayName: 'Highlight ID',
		name: 'igHighlightId',
		type: 'string',
		required: true,
		description: 'Highlight ID (from Get Profile Highlights)',
		default: '',
		displayOptions: { show: { operation: ['igGetHighlightDetails'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['igGetProfilePosts'] } },
		default: {},
		options: [
			{
				displayName: 'End Cursor',
				name: 'end_cursor',
				type: 'string',
				default: '',
				description: 'Pagination cursor from the previous response',
				routing: { send: { type: 'query', property: 'end_cursor' } },
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['igGetProfileReels'] } },
		default: {},
		options: [
			{
				displayName: 'End Cursor',
				name: 'end_cursor',
				type: 'string',
				default: '',
				description: 'Pagination cursor from the previous response',
				routing: { send: { type: 'query', property: 'end_cursor' } },
			},
		],
	},
];

export const instagramPostOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['instagramPost'] } },
		options: [
			{
				name: 'Get Post Details',
				value: 'igGetPostDetails',
				action: 'Get instagram post details',
				description: 'Get media, engagement, caption and owner of a post',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/post/details',
						qs: { shortcode: '={{$parameter.igShortcode}}' },
					},
				},
			},
			{
				name: 'Get Post Shortcode',
				value: 'igGetPostId',
				action: 'Get an instagram post shortcode',
				description: 'Extract the shortcode from an Instagram post URL',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/post/id',
						qs: { link: '={{$parameter.igPostLink}}' },
					},
				},
			},
		],
		default: 'igGetPostDetails',
	},
	{
		displayName: 'Post URL',
		name: 'igPostLink',
		type: 'string',
		required: true,
		placeholder: 'https://www.instagram.com/p/DMF-GjGO0-q/',
		description: 'Instagram post or reel URL',
		default: '',
		displayOptions: { show: { operation: ['igGetPostId'] } },
	},
	{
		displayName: 'Shortcode',
		name: 'igShortcode',
		type: 'string',
		required: true,
		placeholder: 'DMF-GjGO0-q',
		description: 'Post shortcode, the part after /p/ in the URL',
		default: '',
		displayOptions: { show: { operation: ['igGetPostDetails'] } },
	},
];

export const instagramReelOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['instagramReel'] } },
		options: [
			{
				name: 'Get Reels by Audio',
				value: 'igGetReelsByAudio',
				action: 'Get instagram reels by audio',
				description: 'Get reels that use a given sound',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/reels/audio',
						qs: { audio_id: '={{$parameter.igAudioId}}' },
					},
				},
			},
			{
				name: 'Get Reels Feed',
				value: 'igGetReelsFeed',
				action: 'Get instagram reels feed',
				description: 'Get trending and recommended reels',
				routing: {
					request: { method: 'GET', url: '/instagram/reels/feed' },
				},
			},
		],
		default: 'igGetReelsFeed',
	},
	{
		displayName: 'Audio ID',
		name: 'igAudioId',
		type: 'string',
		required: true,
		description: 'Audio cluster (music) ID',
		default: '',
		displayOptions: { show: { operation: ['igGetReelsByAudio'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['igGetReelsByAudio'] } },
		default: {},
		options: [
			{
				displayName: 'Max ID',
				name: 'max_id',
				type: 'string',
				default: '',
				description: 'Pagination cursor from the previous response',
				routing: { send: { type: 'query', property: 'max_id' } },
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['igGetReelsFeed'] } },
		default: {},
		options: [
			{
				displayName: 'Clips Media ID',
				name: 'clips_media_id',
				type: 'string',
				default: '',
				description: 'Clip media ID from a previous response, to chain or paginate',
				routing: { send: { type: 'query', property: 'clips_media_id' } },
			},
		],
	},
];

export const instagramSearchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['instagramSearch'] } },
		options: [
			{
				name: 'Search',
				value: 'igSearch',
				action: 'Search instagram',
				description: 'Search by keyword for popular users, hashtags and places',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/search',
						qs: { keyword: '={{$parameter.igKeyword}}' },
					},
				},
			},
		],
		default: 'igSearch',
	},
	{
		displayName: 'Keyword',
		name: 'igKeyword',
		type: 'string',
		required: true,
		description: 'Search keyword',
		default: '',
		displayOptions: { show: { operation: ['igSearch'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['igSearch'] } },
		default: {},
		options: [
			{
				displayName: 'End Cursor',
				name: 'end_cursor',
				type: 'string',
				default: '',
				description: 'Pagination cursor from the previous response',
				routing: { send: { type: 'query', property: 'end_cursor' } },
			},
		],
	},
];

export const instagramLocationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['instagramLocation'] } },
		options: [
			{
				name: 'Get Location Posts',
				value: 'igGetLocationPosts',
				action: 'Get instagram location posts',
				description: 'Get recent or top posts tagged at a location',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/location/posts',
						qs: { location_id: '={{$parameter.igLocationId}}' },
					},
				},
			},
			{
				name: 'Get Nearby Locations',
				value: 'igGetNearbyLocations',
				action: 'Get nearby instagram locations',
				description: 'Get places near a location, with coordinates and post counts',
				routing: {
					request: {
						method: 'GET',
						url: '/instagram/location/nearby',
						qs: { location_id: '={{$parameter.igLocationId}}' },
					},
				},
			},
		],
		default: 'igGetLocationPosts',
	},
	{
		displayName: 'Location ID',
		name: 'igLocationId',
		type: 'string',
		required: true,
		description: 'Instagram location ID',
		default: '',
		displayOptions: { show: { operation: ['igGetLocationPosts', 'igGetNearbyLocations'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['igGetLocationPosts'] } },
		default: {},
		options: [
			{
				displayName: 'Tab',
				name: 'tab',
				type: 'options',
				options: [
					{ name: 'Ranked', value: 'ranked' },
					{ name: 'Recent', value: 'recent' },
				],
				default: 'ranked',
				description: 'Whether to return top or most recent posts',
				routing: { send: { type: 'query', property: 'tab' } },
			},
			{
				displayName: 'End Cursor',
				name: 'end_cursor',
				type: 'string',
				default: '',
				description: 'Pagination cursor from the previous response',
				routing: { send: { type: 'query', property: 'end_cursor' } },
			},
		],
	},
];
