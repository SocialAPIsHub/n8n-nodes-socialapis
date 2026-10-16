import type { INodeProperties } from 'n8n-workflow';

export const facebookAlbumOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['facebookAlbum'] } },
		options: [
			{
				name: 'Get Album Items',
				value: 'getAlbumItems',
				action: 'Get facebook album items',
				description:
					'Get the photos and videos in a page or group album. Needs an album ID from Get Page Albums or Get Group Albums.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/albums/items',
						qs: { album_id: '={{$parameter.albumId}}' },
					},
				},
			},
		],
		default: 'getAlbumItems',
	},
	{
		displayName: 'Album ID',
		name: 'albumId',
		type: 'string',
		required: true,
		default: '',
		description: 'Album ID, from Get Page Albums or Get Group Albums',
		displayOptions: { show: { operation: ['getAlbumItems'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['getAlbumItems'] } },
		default: {},
		options: [
			{
				displayName: 'End Cursor',
				name: 'end_cursor',
				type: 'string',
				default: '',
				description: 'Cursor for pagination to retrieve the next set of items',
				routing: { send: { type: 'query', property: 'end_cursor' } },
			},
		],
	},
];
