import type { INodeProperties } from 'n8n-workflow';

export const facebookSearchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['facebookSearch'] } },
		options: [
			{
				name: 'Search Locations',
				value: 'searchLocations',
				action: 'Search facebook locations',
				description: 'Search for locations. Returns location UIDs for filtering other search endpoints.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/search/locations',
						qs: { query: '={{$parameter.query}}' },
					},
				},
			},
			{
				name: 'Search Pages',
				value: 'searchPages',
				action: 'Search facebook pages',
				description: 'Search for pages by keyword with optional location filtering. Returns 3 results per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/search/pages',
						qs: {
							query: '={{$parameter.query}}',
							location_uid: '={{$parameter.additionalFields.location_uid}}',
							end_cursor: '={{$parameter.additionalFields.end_cursor}}',
						},
					},
				},
			},
			{
				name: 'Search People',
				value: 'searchPeople',
				action: 'Search facebook people',
				description: 'Search for Facebook people/profiles by keyword. Returns 3 results per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/search/people',
						qs: {
							query: '={{$parameter.query}}',
							location_uid: '={{$parameter.additionalFields.location_uid}}',
							end_cursor: '={{$parameter.additionalFields.end_cursor}}',
						},
					},
				},
			},
			{
				name: 'Search Posts',
				value: 'searchPosts',
				action: 'Search facebook posts',
				description: 'Search for posts by keyword with optional location and time filters. Returns 3 results per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/search/posts',
						qs: {
							query: '={{$parameter.query}}',
							location_uid: '={{$parameter.additionalFields.location_uid}}',
							start_time: '={{$parameter.additionalFields.start_time}}',
							end_time: '={{$parameter.additionalFields.end_time}}',
							recent_posts: '={{$parameter.additionalFields.recent_posts}}',
							end_cursor: '={{$parameter.additionalFields.end_cursor}}',
						},
					},
				},
			},
			{
				name: 'Search Videos',
				value: 'searchVideos',
				action: 'Search facebook videos',
				description: 'Search for Facebook videos by keyword. Returns 7 videos per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/search/videos',
						qs: {
							query: '={{$parameter.query}}',
							most_recent: '={{$parameter.additionalFields.most_recent}}',
							videos_live: '={{$parameter.additionalFields.videos_live}}',
							end_cursor: '={{$parameter.additionalFields.end_cursor}}',
						},
					},
				},
			},
		],
		default: 'searchPages',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		description: 'Keyword to search for',
		default: '',
		displayOptions: { show: { operation: ['searchPages', 'searchPeople', 'searchLocations', 'searchPosts', 'searchVideos'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: { show: { operation: ['searchPages', 'searchPeople', 'searchPosts'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: { show: { operation: ['searchVideos'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['searchPages', 'searchPeople'] } },
		default: {},
		options: [
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor to retrieve the next page of results' },
			{ displayName: 'Location UID', name: 'location_uid', type: 'string', default: '', description: 'Location UID for filtering. Obtain from the Search Locations operation.' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['searchPosts'] } },
		default: {},
		options: [
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor to retrieve the next page of results' },
			{ displayName: 'End Time', name: 'end_time', type: 'string', default: '', description: 'Filter posts before this date (YYYY-MM-DD)' },
			{ displayName: 'Location UID', name: 'location_uid', type: 'string', default: '', description: 'Location UID for filtering. Obtain from the Search Locations operation.' },
			{ displayName: 'Recent Posts', name: 'recent_posts', type: 'boolean', default: false, description: 'Whether to show only recent posts' },
			{ displayName: 'Start Time', name: 'start_time', type: 'string', default: '', description: 'Filter posts after this date (YYYY-MM-DD)' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['searchVideos'] } },
		default: {},
		options: [
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor to retrieve the next page of results' },
			{ displayName: 'Live Videos Only', name: 'videos_live', type: 'boolean', default: false, description: 'Whether to filter for live videos only' },
			{ displayName: 'Most Recent', name: 'most_recent', type: 'boolean', default: false, description: 'Whether to show most recent videos first' },
		],
	},
];