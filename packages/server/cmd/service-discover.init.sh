# only can use the docker internal network
# https://www.consul.io/docs/discovery/services

curl -X PUT \
  -d '{"id": "pushgateway","name": "pushgateway", "tags": ["pushgateway"], "address": "172.21.0.2", "port": 9091, "checks": [{"http": "http://172.21.0.2:9091/-/healthy", "interval": "5s"}]}' \
  http://localhost:8500/v1/agent/service/register
