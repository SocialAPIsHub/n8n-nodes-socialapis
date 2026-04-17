import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { facebookPageOperations } from './FacebookPageDescription';
import { facebookGroupOperations } from './FacebookGroupDescription';
import { facebookPostOperations } from './FacebookPostDescription';
import { facebookSearchOperations } from './FacebookSearchDescription';
import { metaAdsOperations } from './MetaAdsDescription';
import { marketplaceOperations } from './MarketplaceDescription';
import { facebookMediaOperations } from './FacebookMediaDescription';

export class SocialApis implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SocialAPIs',
		name: 'socialApis',
		icon: 'file:socialapis.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Access public data from major social platforms',
		defaults: {
			name: 'SocialAPIs',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'socialApisApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.socialapis.io',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-api-token': '={{$credentials.apiToken}}',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Facebook Page', value: 'facebookPage' },
					{ name: 'Facebook Group', value: 'facebookGroup' },
					{ name: 'Facebook Post', value: 'facebookPost' },
					{ name: 'Facebook Search', value: 'facebookSearch' },
					{ name: 'Meta Ads Library', value: 'metaAds' },
					{ name: 'Facebook Marketplace', value: 'marketplace' },
					{ name: 'Facebook Media', value: 'facebookMedia' },
				],
				default: 'facebookPage',
			},
			...facebookPageOperations,
			...facebookGroupOperations,
			...facebookPostOperations,
			...facebookSearchOperations,
			...metaAdsOperations,
			...marketplaceOperations,
			...facebookMediaOperations,
		],
	};
}
