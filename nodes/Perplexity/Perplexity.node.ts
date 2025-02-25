import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
export class Perplexity implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Perplexity',
		name: 'perplexity',
		icon: 'file:perplexity.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Perplexity AI API',
		defaults: {
			name: 'Perplexity',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'perplexityApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat Completion',
						value: 'chatCompletion',
						description: 'Create a chat completion',
						action: 'Create a chat completion',
					},
				],
				default: 'chatCompletion',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Sonar Reasoning Pro',
						value: 'sonar-reasoning-pro',
					},
					{
						name: 'Sonar Reasoning',
						value: 'sonar-reasoning',
					},
					{
						name: 'Sonar Pro',
						value: 'sonar-pro',
					},
					{
						name: 'Sonar',
						value: 'sonar',
					},
					{
						name: 'R1 1776',
						value: 'r1-1776',
					},
					{
						name: 'Llama 3.1 Sonar Small (Legacy)',
						value: 'llama-3.1-sonar-small-128k-online',
					},
					{
						name: 'Llama 3.1 Sonar Large (Legacy)',
						value: 'llama-3.1-sonar-large-128k-online',
					},
					{
						name: 'Llama 3.1 Sonar Huge (Legacy)',
						value: 'llama-3.1-sonar-huge-128k-online',
					},
				],
				default: 'sonar',
				description: 'The model to use for completion',
				required: true,
			},
			{
				displayName: 'Messages',
				name: 'messages',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'messagesUi',
						displayName: 'Message',
						values: [
							{
								displayName: 'Role',
								name: 'role',
								type: 'options',
								options: [
									{
										name: 'System',
										value: 'system',
									},
									{
										name: 'User',
										value: 'user',
									},
									{
										name: 'Assistant',
										value: 'assistant',
									},
								],
								default: 'user',
							},
							{
								displayName: 'Content',
								name: 'content',
								type: 'string',
								default: '',
							},
						],
					},
				],
				description: 'The messages to send to the API',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Temperature',
						name: 'temperature',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 2,
						},
						default: 0.7,
						description: 'Sampling temperature between 0 and 2',
					},
					{
						displayName: 'Max Tokens',
						name: 'max_tokens',
						type: 'number',
						default: 1024,
						description: 'Maximum number of tokens to generate',
					},
					{
						displayName: 'Top P',
						name: 'top_p',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 1,
						},
						default: 0.9,
						description: 'Nucleus sampling parameter',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;

				if (operation === 'chatCompletion') {
					const model = this.getNodeParameter('model', i) as string;
					const messagesUi = this.getNodeParameter('messages.messagesUi', i, []) as IDataObject[];
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					const messages = messagesUi.map((messageData) => ({
						role: messageData.role as string,
						content: messageData.content as string,
					}));

					const body: IDataObject = {
						model,
						messages,
						...additionalFields,
					};

					const response = await this.helpers.requestWithAuthentication.call(this, 'perplexityApi', {
						method: 'POST',
						url: 'https://api.perplexity.ai/chat/completions',
						body,
						json: true,
					});

					returnData.push({
						json: response,
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
