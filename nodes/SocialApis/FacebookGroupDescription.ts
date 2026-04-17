import type { INodeProperties } from 'n8n-workflow';

export const facebookGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['facebookGroup'] } },
		options: [
			{
				name: 'Get Group ID',
				value: 'getGroupId',
				action: 'Get a facebook group id',
				description: 'Retrieve the Group ID from a group link',
				routing: {
					request: { method: 'GET', url: '/facebook/groups/id', qs: { link: '={{$parameter.link}}' } },
				},
			},
			{
				name: 'Get Group Details',
				value: 'getGroupDetails',
				action: 'Get facebook group details',
				description: 'Get group metadata: name, members, description',
				routing: {
					request: { method: 'GET', url: '/facebook/groups/details', qs: { link: '={{$parameter.link}}' } },
				},
			},
			{
				name: 'Get Group Posts',
				value: 'getGroupPosts',
				action: 'Get facebook group posts',
				description: 'Fetch recent posts from a group. Returns 3 posts per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/groups/posts',
						qs: {
							link: '={{$parameter.link}}',
							end_cursor: '={{$parameter.additionalFields.end_cursor}}',
							after_time: '={{$parameter.additionalFields.after_time}}',
							before_time: '={{$parameter.additionalFields.before_time}}',
							timezone: '={{$parameter.additionalFields.timezone}}',
						},
					},
				},
			},
		],
		default: 'getGroupDetails',
	},
	{
		displayName: 'Group URL',
		name: 'link',
		type: 'string',
		required: true,
		description: 'The Facebook Group URL',
		default: 'https://www.facebook.com/groups/gieldagryplanszowe',
		displayOptions: { show: { operation: ['getGroupId', 'getGroupDetails', 'getGroupPosts'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 3,
		description: 'Max number of results to return. Group posts return 3 items per API call by default.',
		displayOptions: { show: { operation: ['getGroupPosts'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['getGroupPosts'] } },
		default: {},
		options: [
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Cursor for pagination to retrieve the next set of posts' },
			{ displayName: 'After Time', name: 'after_time', type: 'string', default: '', description: 'Return posts published after this timestamp (ISO 8601 or Unix)' },
			{ displayName: 'Before Time', name: 'before_time', type: 'string', default: '', description: 'Return posts published before this timestamp (ISO 8601 or Unix)' },
			{ displayName: 'Timezone', name: 'timezone', type: 'string', default: 'UTC', description: 'Timezone for returned timestamps, e.g. UTC' },
		],
	},
];
