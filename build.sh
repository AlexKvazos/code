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

# You can use my repository to push candidate's repository or add your own details here
GITHUB_USER="rudypalacios"
PERSONAL_TOKEN="d75682a99bed8f4abd3d107c5c2b96e0280a7e53"

# Process starts
AUTOMATED_REPO_NAME=`sed -n "$RANDOM p" /usr/share/dict/words`
CREATE_REPO_RESPONSE=$(curl -H "Authorization: token ${PERSONAL_TOKEN}" https://api.github.com/user/repos -d "{\"name\":\"${AUTOMATED_REPO_NAME}\"}")
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
sed "s/AUTOMATED_REPO_NAME/${AUTOMATED_REPO_NAME}/g" README.md > "${NEW_REPO_FOLDER}/README.md"

REPO_URL="https://github.com/${GITHUB_USER}/${AUTOMATED_REPO_NAME}.git"

cd $NEW_REPO_FOLDER
git init
git add .
git ci -a -m "Initial commit"
git remote add origin ${REPO_URL}
git push -u origin master

echo -e "\033[0;33m-------------------------------------------------------------------\nRepository: ${REPO_URL}\n-------------------------------------------------------------------\033[0m"