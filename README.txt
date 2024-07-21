Thanks a lot for reviewing this task.

To be able to execute all the following steps need to be performed:
- npm install
- configure .env file;
    - UI tests require the following configuration:
        USER_NAME - user to login to admin moralis
        PASSWORD - password of the above user
    - RPC Nodes api ones:
        NODE_CHAIN
        NODE_API_KEY

        The above configs are a part of site configuration after node creation:
        https://site1.moralis-nodes.com/<NODE_CHAIN>/<NODE_API_KEY>

        NOTE: For these tests, the assumption is that the node would be created manually in the admin dashboard
    - Get Wallet NFTs requires:
        API_KEY - API key for Moralis account
- execute ui:test for running ui tests (node creation)
- execute nft-api:test for running tests for "Get Wallet NFTs" API
- execute rpc-nodes-api:test for running tests for "RPC Nodes" api


IMPORTANT: 
- UI tests are creating nodes with a random configuration, to make them always work, all nodes get cleaned up for an account.
- For the few negative RPC Nodes API tests from time to time different error is returned from the BE. They might fail, this should  be reported as a bug

Bonus - k6:

I tried to configure a simple scenario for the RPC Nodes API request. To execute it please follow the below instructions:
- install k6 if not available (I used MacOS: brew install k6)
- execute the scenario with a command like following: CHAIN_KEY=<node_chain(eth as example)>/<node_api_key(a648cb2c460e4ede80ec94a39c624c76 as example)> npm run k6:rpc-nodes

NOTE: node should be created in the admin moralis before execution