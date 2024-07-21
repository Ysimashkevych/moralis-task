Thanks a lot for reviewing this task.

In order to be able to execute all the following steps needs to be performed:
- npm install
- configure .env file;
    - UI tests require folowing configuration:
        USER_NAME - user to login to admin moralis
        PASSWORD - password of the abov user
    - RPC Nodes api ones:
        NODE_CHAIN
        NODE_API_KEY

        Above configs are a part of site configuration after node creation:
        https://site1.moralis-nodes.com/<NODE_CHAIN>/<NODE_API_KEY>

        NOTE: For theese tests, the assuptions is that node would be created manually in admin dashboard
    - Get Wallet NFTs require:
        API_KEY - API key for Moralis account
- execute ui:test for running ui tests (node creation)
- execute nft-api:test for running tests for "Get Wallet NFTs" api
- execute rpc-nodes-api:test for running tests for "RPC Nodes" api


IMPORTANT: 
- UI tests are creating nodes with a random configuration, in other to make them always work, all nodes get celaned up.
- For the few negative RPC Nodes api tests from time to time different error is returned from the BE. They might fail, this should  be reported as a bug