pushgateway_addr='10.12.198.50'
pushgateway_port='9091'

echo 🔴 register pushgateway service
sh ./service-discover.init.sh $pushgateway_addr 9091
sh ./service-discover.init.sh $pushgateway_addr 9092

echo 🔴 init pushgateway group
sh ./pushgateway.init.sh http://$pushgateway_addr:9091
sh ./pushgateway.init.sh http://$pushgateway_addr:9092
