# only can use the docker internal network
# https://www.consul.io/docs/discovery/services

source ./color.sh

consul_addr=$1
pushgateway_ip=$2
pushgateway_port=$3

function get_register_body {
  register_body=$(cat << EOF
{
  "id": "pushgateway_$2",
  "name": "pushgateway",
  "tags": ["pushgateway"],
  "address": "$1",
  "port": $2,
  "checks": [
    {
      "http": "http://$1:$2/-/healthy",
      "interval": "5s"
    }
  ]
}
EOF
)
  echo $register_body
}

curl -X PUT -d "$(get_register_body $pushgateway_ip $pushgateway_port)" $consul_addr/v1/agent/service/register
white registe $(green pushgateway http://$pushgateway_ip:$pushgateway_port) to $(green consul $consul_addr/v1/agent/service/register)
