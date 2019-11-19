export const environment = {
  production: true,
  mock: false,
  api: {
    salus: 'https://api/salus',
    metrics: 'api/metrics'
  },
  pagination: {
    pageSize: 25,
    resources: {
      pageSize: 25
    },
    monitors: {
      pageSize: 25
    }
  },
  resources: {
    disallowLabelEdit: 'agent_'
  }
};
