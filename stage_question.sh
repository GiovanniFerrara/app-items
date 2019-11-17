echo 'Running in local mode...'
read -p "type your staging:" staging 
read -p "Do you wanna run Items or Comments (i,c)" service

export DYNAMODB_TABLE="items-${staging}"
export IS_LOCAL_ENV=true
export USERS_URL="https://qmk33jcqwh.execute-api.eu-west-2.amazonaws.com/giovanni/user"

if [ $service = i ]
then
	echo "Starting with: $DYNAMODB_TABLE"
	nodemon ./lambdas/items
fi

if [ $service = c ]
then
	echo "Starting with: $DYNAMODB_TABLE"
	nodemon ./lambdas/comments
fi