# Load custom setitngs
-include .env.local
export

deploy:
	@npm run build
	@docker run -it --rm -e SAM_CLI_TELEMETRY=0 \
			-e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
			-e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
			-v $(CURDIR):/home/samcli \
			-u root \
			pahud/aws-sam-cli:latest aws s3 sync build/ s3://netpropi-web-dev