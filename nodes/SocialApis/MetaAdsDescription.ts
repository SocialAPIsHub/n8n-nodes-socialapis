import type { INodeProperties } from 'n8n-workflow';

export const metaAdsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['metaAds'] } },
		options: [
			{
				name: 'Get Ad Details',
				value: 'getAdDetails',
				action: 'Get ad archive details',
				description: 'Get detailed info about a specific archived ad by archive ID',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/ads/archive-details',
						qs: {
							ad_archive_id: '={{$parameter.adArchiveId}}',
						},
					},
				},
			},
			{
				name: 'Get Page Ad Details',
				value: 'getPageAdDetails',
				action: 'Get page ad details',
				description: 'Get detailed info about a specific Facebook page from the Ads Library',
				routing: {
					request: { method: 'GET', url: '/facebook/ads/page-details', qs: { page_id: '={{$parameter.pageId}}' } },
				},
			},
			{
				name: 'Get Supported Countries',
				value: 'getSupportedCountries',
				action: 'Get supported countries',
				description: 'Get list of supported country codes for Meta Ads Library filtering',
				routing: {
					request: { method: 'GET', url: '/facebook/ads/countries' },
				},
			},
			{
				name: 'Search Ads',
				value: 'searchAds',
				action: 'Search the meta ads library',
				description: 'Search ads in the Meta Ad Library by keyword or page ID. Returns 10 ads per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/ads/search',
					},
				},
			},
			{
				name: 'Search by Keyword',
				value: 'searchAdsByKeyword',
				action: 'Search ads by keyword',
				description: 'Search for ads by keyword with optional country filter',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/ads/keywords',
						qs: {
							query: '={{$parameter.adsQuery}}',
						},
					},
				},
			},
		],
		default: 'searchAds',
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
		displayOptions: { show: { operation: ['searchAds'] } },
	},
	{
		displayName: 'Ad Archive ID',
		name: 'adArchiveId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { operation: ['getAdDetails'] } },
	},
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		required: true,
		description: 'The Facebook Page ID',
		default: '',
		displayOptions: { show: { operation: ['getPageAdDetails'] } },
	},
	{
		displayName: 'Query',
		name: 'adsQuery',
		type: 'string',
		required: true,
		description: 'Search keyword',
		default: '',
		displayOptions: { show: { operation: ['searchAdsByKeyword'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['searchAds'] } },
		default: {},
		options: [
			{ displayName: 'Active Status', name: 'activeStatus', type: 'options', options: [{ name: 'All', value: 'ALL' }, { name: 'Active', value: 'Active' }, { name: 'Inactive', value: 'Inactive' }], default: 'ALL', routing: { send: { type: 'query', property: 'activeStatus' } } },
			{ displayName: 'Ad Page ID', name: 'ad_page_id', type: 'string', default: '', description: 'Facebook AD Page ID. Used only if query is not provided.', routing: { send: { type: 'query', property: 'ad_page_id' } } },
			{ displayName: 'After Time', name: 'after_time', type: 'string', default: '', description: 'Filter ads after this date (YYYY-MM-DD)', routing: { send: { type: 'query', property: 'after_time' } } },
			{ displayName: 'Before Time', name: 'before_time', type: 'string', default: '', description: 'Filter ads before this date (YYYY-MM-DD)', routing: { send: { type: 'query', property: 'before_time' } } },
			{ displayName: 'Country', name: 'country', type: 'string', default: 'ALL', description: 'ISO country code or ALL', routing: { send: { type: 'query', property: 'country' } } },
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor', routing: { send: { type: 'query', property: 'end_cursor' } } },
			{ displayName: 'Query', name: 'query', type: 'string', default: '', description: 'Search keyword for ads', routing: { send: { type: 'query', property: 'query' } } },
			{ displayName: 'Sort Data', name: 'sort_data', type: 'options', options: [{ name: 'Impressions (High to Low)', value: 'impressions' }, { name: 'Most Recent', value: 'recent' }], default: 'recent', routing: { send: { type: 'query', property: 'sort_data' } } },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['getAdDetails'] } },
		default: {},
		options: [
			{ displayName: 'Country', name: 'country', type: 'string', default: 'ALL', description: 'ISO country code or ALL', routing: { send: { type: 'query', property: 'country' } } },
			{ displayName: 'Non-Political Ad', name: 'is_ad_non_political', type: 'boolean', default: false, description: 'Whether to filter non-political ads', routing: { send: { type: 'query', property: 'is_ad_non_political' } } },
			{ displayName: 'Not AAA Eligible', name: 'is_ad_not_aaa_eligible', type: 'boolean', default: false, description: 'Whether to filter AAA eligibility', routing: { send: { type: 'query', property: 'is_ad_not_aaa_eligible' } } },
			{ displayName: 'Page ID', name: 'page_id', type: 'string', default: '', description: 'Facebook Page ID', routing: { send: { type: 'query', property: 'page_id' } } },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['searchAdsByKeyword'] } },
		default: {},
		options: [
			{ displayName: 'Country', name: 'country', type: 'string', default: 'ALL', description: 'ISO country code or ALL', routing: { send: { type: 'query', property: 'country' } } },
		],
	},
];