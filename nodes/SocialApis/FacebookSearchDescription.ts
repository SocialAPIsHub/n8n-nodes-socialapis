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
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor to retrieve the next page of results', routing: { send: { type: 'query', property: 'end_cursor' } } },
			{ displayName: 'Location UID', name: 'location_uid', type: 'string', default: '', description: 'Location UID for filtering. Obtain from the Search Locations operation.', routing: { send: { type: 'query', property: 'location_uid' } } },
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
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor to retrieve the next page of results', routing: { send: { type: 'query', property: 'end_cursor' } } },
			{ displayName: 'End Time', name: 'end_time', type: 'string', default: '', description: 'Filter posts before this date (YYYY-MM-DD)', routing: { send: { type: 'query', property: 'end_time' } } },
			{ displayName: 'Location UID', name: 'location_uid', type: 'string', default: '', description: 'Location UID for filtering. Obtain from the Search Locations operation.', routing: { send: { type: 'query', property: 'location_uid' } } },
			{ displayName: 'Recent Posts', name: 'recent_posts', type: 'boolean', default: false, description: 'Whether to show only recent posts', routing: { send: { type: 'query', property: 'recent_posts' } } },
			{ displayName: 'Start Time', name: 'start_time', type: 'string', default: '', description: 'Filter posts after this date (YYYY-MM-DD)', routing: { send: { type: 'query', property: 'start_time' } } },
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
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor to retrieve the next page of results', routing: { send: { type: 'query', property: 'end_cursor' } } },
			{ displayName: 'Live Videos Only', name: 'videos_live', type: 'boolean', default: false, description: 'Whether to filter for live videos only', routing: { send: { type: 'query', property: 'videos_live' } } },
			{ displayName: 'Most Recent', name: 'most_recent', type: 'boolean', default: false, description: 'Whether to show most recent videos first', routing: { send: { type: 'query', property: 'most_recent' } } },
		],
	},
];