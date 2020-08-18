#!/bin/bash

# Usage
# 
# ./build.sh n1 n2 n3
# 
# Where n1, n2 and n3 is the number of exercise you want to clone. i.e.
#
# ./build.sh 1 3 7
#
# Will create a repository with exercises 1.unit_testing, 3.front_end and 7.apa_yapa
# Code review exercise and Readme will be copied and modified by default
#

# Process starts
read -p 'Github.com username: ' GITHUB_USER

AUTOMATED_REPO_NAME=`sed -n "$RANDOM p" /usr/share/dict/words`
CREATE_REPO_RESPONSE=$(curl -u ${GITHUB_USER} https://api.github.com/user/repos -d "{\"name\":\"${AUTOMATED_REPO_NAME}\", \"private\":true}")

CLONE_URL=$(echo "${CREATE_REPO_RESPONSE}" | jq .clone_url)

# Exit on error
if [[ "${CLONE_URL}" == "null" ]]; then
    echo $CREATE_REPO_RESPONSE | jq .
    exit 0
fi

CURRENT_DIR=`pwd`
NEW_REPO_FOLDER="${CURRENT_DIR/codex/$AUTOMATED_REPO_NAME}"

mkdir $NEW_REPO_FOLDER

for exercises in "$@"
do
    FOLDER=`ls | grep "${exercises}."`
    cp -r $FOLDER $NEW_REPO_FOLDER
done

CODE_REVIEW_REPO="cp -r 8.code_review ${NEW_REPO_FOLDER}/8.code_review"
$CODE_REVIEW_REPO


# Create Readme in new repo with token replaced
sed "s/AUTOMATED_REPO_NAME/${GITHUB_USER}\/${AUTOMATED_REPO_NAME}/g" README.md > "${NEW_REPO_FOLDER}/README.md"

REPO_URL="https://github.com/${GITHUB_USER}/${AUTOMATED_REPO_NAME}.git"

cd $NEW_REPO_FOLDER
git init
# Adding automated user as source to protect privacy
git config user.email "${AUTOMATED_REPO_NAME}@nodomain23.com"
git add .
git commit -a -m "Initial commit"
git remote add origin ${REPO_URL}
git push -u origin master

echo -e "\033[0;33m-------------------------------------------------------------------\nRepository: ${REPO_URL}\n-------------------------------------------------------------------\033[0m"