source ./color.sh

pushgateway_addr=$1

echo "some_metric 3.14" | curl --data-binary @- $pushgateway_addr/metrics/job/some_job
white init pushgateway $(green $pushgateway_addr)
