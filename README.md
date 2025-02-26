# n8n-nodes-perplexity

This is an n8n community node for the [Perplexity AI API](https://docs.perplexity.ai/). It provides access to Perplexity's large language models through n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Quick Installation

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@watzon/n8n-nodes-perplexity` in **Enter npm package name**
4. Agree to the risks of using community nodes
5. Select **Install**

**Note:** After installation, you need to restart your n8n instance for the new node to be recognized.

## Operations

### Chat Completion

Create chat completions using Perplexity's LLMs. The node supports:

- Multiple messages with system, user, and assistant roles
- All available Perplexity models:
  - Sonar Reasoning Pro
  - Sonar Reasoning
  - Sonar Pro
  - Sonar
  - R1 1776
  - Llama 3.1 Sonar Small (Legacy)
  - Llama 3.1 Sonar Large (Legacy)
  - Llama 3.1 Sonar Huge (Legacy)
- Customizable parameters:
  - Temperature (0-2)
  - Max tokens
  - Top P

## Credentials

To use this node, you need a Perplexity API key. You can obtain one by:

1. Going to [Perplexity AI](https://www.perplexity.ai/)
2. Creating an account or signing in
3. Navigating to the API section
4. Generating an API key

## Compatibility

- Requires n8n version 1.0.0 or later
- Tested up to n8n version 1.24.0

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Perplexity API documentation](https://docs.perplexity.ai/)

## Version History

### 0.5.2

- Add support for Deep Research

### 0.5.1

- Update n8n-workflow to the latest version

### 0.5.0

- Added support for new Perplexity models

### 0.4.2

- Initial usable release

## License

[MIT](LICENSE.md)
