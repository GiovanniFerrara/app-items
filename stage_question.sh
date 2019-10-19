echo 'Running in local mode...'
read -p "type your staging:" staging 
read -p "Are you sure that $staging is your staging? (y,n)" is_sure
if [ $is_sure = y ]
then
	export DYNAMODB_TABLE="items-${staging}"
	export IS_LOCAL_ENV=true
	export USERS_URL="https://qmk33jcqwh.execute-api.eu-west-2.amazonaws.com/giovanni/user"
	echo "Starting with: $DYNAMODB_TABLE"
	nodemon ./lambdas/items
fi