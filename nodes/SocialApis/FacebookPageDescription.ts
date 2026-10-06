import type { INodeProperties } from 'n8n-workflow';

export const facebookPageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['facebookPage'] } },
		options: [
			{
				name: 'Get Page Details',
				value: 'getPageDetails',
				action: 'Get facebook page details',
				description: 'Get detailed metadata: likes, followers, contact info',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/pages/details',
						qs: { link: '={{$parameter.link}}' },
					},
				},
			},
			{
				name: 'Get Page ID',
				value: 'getPageId',
				action: 'Get a facebook page id',
				description: 'Retrieve the Facebook Page ID from a page link',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/pages/id',
						qs: { link: '={{$parameter.link}}' },
					},
				},
			},
			{
				name: 'Get Page Posts',
				value: 'getPagePosts',
				action: 'Get facebook page posts',
				description:
					'Fetch recent posts with reactions, media, and comments. Returns 3 posts per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/pages/posts',
						qs: {
							link: '={{$parameter.link}}',
						},
					},
				},
			},
			{
				name: 'Get Page Reels',
				value: 'getPageReels',
				action: 'Get facebook page reels',
				description:
					'Retrieve short-form video content (Reels) from a Page. Returns 3 reels per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/pages/reels',
						qs: {
							link: '={{$parameter.link}}',
						},
					},
				},
			},
			{
				name: 'Get Page Videos',
				value: 'getPageVideos',
				action: 'Get facebook page videos',
				description: 'Retrieve videos from a Page. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/pages/videos',
						qs: { link: '={{$parameter.link}}' },
					},
				},
			},
		],
		default: 'getPageDetails',
	},
	{
		displayName: 'Page URL',
		name: 'link',
		type: 'string',
		required: true,
		description: 'The Facebook Page URL',
		default: 'https://www.facebook.com/nike',
		displayOptions: {
			show: {
				operation: ['getPageId', 'getPageDetails', 'getPagePosts', 'getPageReels', 'getPageVideos'],
			},
		},
	},
	{
		displayName: 'Posts Per Call',
		name: 'postsPerCall',
		type: 'number',
		typeOptions: { minValue: 3, maxValue: 9 },
		default: 3,
		description: 'How many posts to return in one call (3-9). Use End Cursor for the next page.',
		displayOptions: { show: { operation: ['getPagePosts'] } },
		routing: { send: { type: 'query', property: 'limit' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['getPagePosts'] } },
		default: {},
		options: [
			{
				displayName: 'End Cursor',
				name: 'end_cursor',
				type: 'string',
				default: '',
				description: 'Cursor for pagination to retrieve the next set of posts',
				routing: { send: { type: 'query', property: 'end_cursor' } },
			},
			{
				displayName: 'After Time',
				name: 'after_time',
				type: 'string',
				default: '',
				description: 'Only include posts published after this timestamp (ISO 8601 format)',
				routing: { send: { type: 'query', property: 'after_time' } },
			},
			{
				displayName: 'Before Time',
				name: 'before_time',
				type: 'string',
				default: '',
				description: 'Only include posts published before this timestamp (ISO 8601 format)',
				routing: { send: { type: 'query', property: 'before_time' } },
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: 'UTC',
				description: 'Timezone used for formatting post timestamps (e.g. UTC, America/New_York)',
				routing: { send: { type: 'query', property: 'timezone' } },
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['getPageReels'] } },
		default: {},
		options: [
			{
				displayName: 'End Cursor',
				name: 'end_cursor',
				type: 'string',
				default: '',
				description: 'Cursor for pagination to retrieve the next set of reels',
				routing: { send: { type: 'query', property: 'end_cursor' } },
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['getPageVideos'] } },
		default: {},
		options: [
			{
				displayName: 'End Cursor',
				name: 'end_cursor',
				type: 'string',
				default: '',
				description: 'Cursor for pagination to retrieve the next set of videos',
				routing: { send: { type: 'query', property: 'end_cursor' } },
			},
		],
	},
];
