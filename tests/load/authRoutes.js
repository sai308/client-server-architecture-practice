const autocannon = require('autocannon');

// Configurations for each load test
const testConfigs = [
  {
    name: 'Login Test',
    url: 'https://localhost/api/auth/sign-in',
    method: 'POST',
    payload: { username: 'testuser', password: 'password123' },
    connections: 100,
    duration: 30,
  },
  {
    name: 'Registration Test',
    url: 'https://localhost/api/auth/sign-up',
    method: 'POST',
    payload: { username: 'newuser', password: 'password123' },
    connections: 100,
    duration: 30,
  },
  {
    name: 'Protected Route Test',
    url: 'https://localhost/api/auth/log-out',
    method: 'POST',
    connections: 100,
    duration: 30,
  },
  {
    name: 'Static Route Test',
    url: 'https://localhost/index.html',
    method: 'GET',
    connections: 50,
    duration: 15,
  },
];

// Function to format and log results
function logSummary(name, result) {
  const summary = `
  📊 Load Test Summary for ${name}:
  ======================================================
  📅 Duration: ${result.duration}s
  👥 Connections: ${result.connections}
  🔁 Total Requests Sent: ${result.requests.sent}
  ------------------------------------------------------
  💀 Errors: ${result.errors}
  ------------------------------------------------------
  🚦 Status Codes:
      - 1xx: ${result['1xx'] || 0}
      - 2xx: ${result['2xx'] || 0}
      - 3xx: ${result['3xx'] || 0}
      - 4xx: ${result['4xx'] || 0}
      - 5xx: ${result['5xx'] || 0}
  📈 Requests per Second: ${result.requests.average || 0}
  🕒 Average Latency (ms): ${result.latency.average || 0}
  🔄 Total Throughput (bytes): ${result.throughput.total || 0}
  `;

  console.log(summary);
}

// Function to run a load test based on the configuration
function runTest(config) {
  const testConfig = {
    url: config.url,
    connections: config.connections,
    duration: config.duration,
    method: config.method,
    body: config.payload ? JSON.stringify(config.payload) : null,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(`Starting load test: ${config.name}`);

  autocannon(testConfig, (err, result) => {
    if (err) {
      console.error(`Error running load test for ${config.name}:`, err);
    } else {
      logSummary(config.name, result);
    }
  });
}

// Function to iterate over all test configurations and run them
function runLoadTests() {
  console.log('🚀 Initiating all load tests...');
  for (const config of testConfigs) {
    runTest(config);
  }
}

runLoadTests();
