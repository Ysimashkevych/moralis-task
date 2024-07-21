import http from 'k6/http';
import { check, fail } from 'k6';

export const options = {
  vus: 10,
  duration: '15s',
};

export default async function () {
  const url = `https://site1.moralis-nodes.com/eth/a648cb2c460e4ede80ec94a39c624b75`;
  const payload = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_blockNumber"
  });

  const params = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    }
  };

  const response = http.post(url, payload, params);
  if (
    !check(response, {
      'status code 200': (r) => r.status === 200
    })
  ) {
    fail("Other than 200 status code received.");
  }
  const jsonBody = response.json();
  if(
  !check(jsonBody, {
    'body contain result': (r) => r.result !== undefined
  })
) {
  fail('Address of the latest block was not received.')
}
}
