source ./color.sh

pushgateway_ip=$2
pushgateway_port=$3

# TODO alert targets.json file

white registery $(green pushgateway http://$pushgateway_ip:$pushgateway_port)
