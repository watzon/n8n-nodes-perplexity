import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PerplexityApi implements ICredentialType {
	name = 'perplexityApi';
	displayName = 'Perplexity API';
	documentationUrl = 'https://docs.perplexity.ai/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Perplexity API key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.perplexity.ai',
			url: '/chat/completions',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				model: 'mistral-7b-instruct',
				messages: [
					{
						role: 'user',
						content: 'Hello',
					},
				],
			},
		},
	};
} 