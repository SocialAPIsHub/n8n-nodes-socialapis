import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SocialApisApi implements ICredentialType {
	name = 'socialApisApi';

	displayName = 'SocialAPIs API';

	icon: Icon = { light: 'file:../icons/socialapis.svg', dark: 'file:../icons/socialapis.dark.svg' };

	documentationUrl = 'https://github.com/SocialAPIsHub/n8n-nodes-socialapis#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your SocialAPIs API token, from https://socialapis.io/dashboard',
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

	// /usage costs no credits, so testing the credential doesn't spend any.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.socialapis.io',
			url: '/usage',
		},
	};
}
