import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { accountOperations } from './AccountDescription';
import { facebookPageOperations } from './FacebookPageDescription';
import { facebookGroupOperations } from './FacebookGroupDescription';
import { facebookPostOperations } from './FacebookPostDescription';
import { facebookSearchOperations } from './FacebookSearchDescription';
import { metaAdsOperations } from './MetaAdsDescription';
import { marketplaceOperations } from './MarketplaceDescription';
import { facebookMediaOperations } from './FacebookMediaDescription';
import {
	instagramLocationOperations,
	instagramPostOperations,
	instagramProfileOperations,
	instagramReelOperations,
	instagramSearchOperations,
} from './InstagramDescription';

export class SocialApis implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SocialAPIs',
		name: 'socialApis',
		icon: {
			light: 'file:../../icons/socialapis.svg',
			dark: 'file:../../icons/socialapis.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Get public Facebook and Instagram data: pages, posts, groups, Ads Library, Marketplace, profiles and reels',
		defaults: {
			name: 'SocialAPIs',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Facebook Group', value: 'facebookGroup' },
					{ name: 'Facebook Marketplace', value: 'marketplace' },
					{ name: 'Facebook Media', value: 'facebookMedia' },
					{ name: 'Facebook Page', value: 'facebookPage' },
					{ name: 'Facebook Post', value: 'facebookPost' },
					{ name: 'Facebook Search', value: 'facebookSearch' },
					{ name: 'Instagram Location', value: 'instagramLocation' },
					{ name: 'Instagram Post', value: 'instagramPost' },
					{ name: 'Instagram Profile', value: 'instagramProfile' },
					{ name: 'Instagram Reel', value: 'instagramReel' },
					{ name: 'Instagram Search', value: 'instagramSearch' },
					{ name: 'Meta Ads Library', value: 'metaAds' },
				],
				default: 'facebookPage',
			},
			...accountOperations,
			...facebookPageOperations,
			...facebookGroupOperations,
			...facebookPostOperations,
			...facebookSearchOperations,
			...metaAdsOperations,
			...marketplaceOperations,
			...facebookMediaOperations,
			...instagramProfileOperations,
			...instagramPostOperations,
			...instagramReelOperations,
			...instagramSearchOperations,
			...instagramLocationOperations,
		],
	};
}
