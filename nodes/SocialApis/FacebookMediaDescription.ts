import type { INodeProperties } from 'n8n-workflow';

export const facebookMediaOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['facebookMedia'] } },
		options: [
			{
				name: 'Download Media',
				value: 'downloadMedia',
				action: 'Download facebook media',
				description: 'Download media (images, videos, audio) from Facebook URLs',
				routing: {
					request: { method: 'GET', url: '/facebook/media/download', qs: { url: '={{$parameter.url}}' } },
				},
			},
		],
		default: 'downloadMedia',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The Facebook media URL to download',
		default: '',
		displayOptions: { show: { operation: ['downloadMedia'] } },
	},
];
