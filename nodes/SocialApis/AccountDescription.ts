import type { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['account'] } },
		options: [
			{
				name: 'Get Limits',
				value: 'getLimits',
				action: 'Get account rate limits',
				description: 'Get your plan rate limits. Free, no credits used.',
				routing: {
					request: { method: 'GET', url: '/usage/limits' },
				},
			},
			{
				name: 'Get Top-Ups',
				value: 'getTopUps',
				action: 'Get account top ups',
				description: 'Get your credit top-up history. Free, no credits used.',
				routing: {
					request: { method: 'GET', url: '/usage/top-ups' },
				},
			},
			{
				name: 'Get Usage',
				value: 'getUsage',
				action: 'Get account usage',
				description: 'Get your plan, credits used and credits remaining. Free, no credits used.',
				routing: {
					request: { method: 'GET', url: '/usage' },
				},
			},
		],
		default: 'getUsage',
	},
];
