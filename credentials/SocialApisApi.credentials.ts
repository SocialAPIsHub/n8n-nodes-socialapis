import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class SocialApisApi implements ICredentialType {
	name = 'socialApisApi';
	displayName = 'SocialAPIs API';
	documentationUrl = 'https://docs.socialapis.io/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-token': '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.socialapis.io',
			url: '/facebook/pages/id',
			headers: {
				'x-api-token': '={{ $credentials.apiToken }}',
			},
			qs: {
				link: 'https://www.facebook.com/Meta',
			},
		},
	};
}
