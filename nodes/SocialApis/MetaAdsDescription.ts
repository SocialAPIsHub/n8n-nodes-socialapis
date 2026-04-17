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
				name: 'Search Ads',
				value: 'searchAds',
				action: 'Search the meta ads library',
				description: 'Search ads in the Meta Ad Library by keyword or page ID. Returns 10 ads per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/ads/search',
						qs: {
							query: '={{$parameter.additionalFields.query}}',
							ad_page_id: '={{$parameter.additionalFields.ad_page_id}}',
							country: '={{$parameter.additionalFields.country}}',
							activeStatus: '={{$parameter.additionalFields.activeStatus}}',
							after_time: '={{$parameter.additionalFields.after_time}}',
							before_time: '={{$parameter.additionalFields.before_time}}',
							sort_data: '={{$parameter.additionalFields.sort_data}}',
							end_cursor: '={{$parameter.additionalFields.end_cursor}}',
						},
					},
				},
			},
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
							page_id: '={{$parameter.additionalFields.page_id}}',
							country: '={{$parameter.additionalFields.country}}',
							is_ad_non_political: '={{$parameter.additionalFields.is_ad_non_political}}',
							is_ad_not_aaa_eligible: '={{$parameter.additionalFields.is_ad_not_aaa_eligible}}',
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
							country: '={{$parameter.additionalFields.country}}',
						},
					},
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
		],
		default: 'searchAds',
	},
	// --- Ad Archive ID ---
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		description: 'Max number of results to return. Ads search returns 10 items per API call by default.',
		displayOptions: { show: { operation: ['searchAds'] } },
	},
	{
		displayName: 'Ad Archive ID',
		name: 'adArchiveId',
		type: 'string',
		required: true,
		description: 'The Ad Archive ID',
		default: '',
		displayOptions: { show: { operation: ['getAdDetails'] } },
	},
	// --- Page ID ---
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		required: true,
		description: 'The Facebook Page ID',
		default: '',
		displayOptions: { show: { operation: ['getPageAdDetails'] } },
	},
	// --- Keyword query for keyword search ---
	{
		displayName: 'Query',
		name: 'adsQuery',
		type: 'string',
		required: true,
		description: 'Search keyword',
		default: '',
		displayOptions: { show: { operation: ['searchAdsByKeyword'] } },
	},
	// --- Additional Fields for Search Ads ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['searchAds'] } },
		default: {},
		options: [
			{ displayName: 'Query', name: 'query', type: 'string', default: '', description: 'Search keyword for ads' },
			{ displayName: 'Ad Page ID', name: 'ad_page_id', type: 'string', default: '', description: 'Facebook AD Page ID. Used only if query is not provided.' },
			{ displayName: 'Country', name: 'country', type: 'string', default: 'ALL', description: 'ISO country code or ALL' },
			{ displayName: 'Active Status', name: 'activeStatus', type: 'options', options: [{ name: 'All', value: 'ALL' }, { name: 'Active', value: 'Active' }, { name: 'Inactive', value: 'Inactive' }], default: 'ALL' },
			{ displayName: 'After Time', name: 'after_time', type: 'string', default: '', description: 'Filter ads after this date (YYYY-MM-DD)' },
			{ displayName: 'Before Time', name: 'before_time', type: 'string', default: '', description: 'Filter ads before this date (YYYY-MM-DD)' },
			{ displayName: 'Sort Data', name: 'sort_data', type: 'options', options: [{ name: 'Impressions (High to Low)', value: 'impressions' }, { name: 'Most Recent', value: 'recent' }], default: 'recent' },
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor' },
		],
	},
	// --- Additional Fields for Ad Details ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['getAdDetails'] } },
		default: {},
		options: [
			{ displayName: 'Page ID', name: 'page_id', type: 'string', default: '', description: 'Facebook Page ID' },
			{ displayName: 'Country', name: 'country', type: 'string', default: 'ALL', description: 'ISO country code or ALL' },
			{ displayName: 'Non-Political Ad', name: 'is_ad_non_political', type: 'boolean', default: false, description: 'Whether to filter non-political ads' },
			{ displayName: 'Not AAA Eligible', name: 'is_ad_not_aaa_eligible', type: 'boolean', default: false, description: 'Whether to filter AAA eligibility' },
		],
	},
	// --- Additional Fields for Keyword Search ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['searchAdsByKeyword'] } },
		default: {},
		options: [
			{ displayName: 'Country', name: 'country', type: 'string', default: 'ALL', description: 'ISO country code or ALL' },
		],
	},
];
