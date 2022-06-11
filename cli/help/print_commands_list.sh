#!/bin/bash

echo "To run any script use $(tput setaf 2)'./run <script>'$(tput sgr 0) in project root dir"
echo "To add any script edit $(tput setaf 2)'./cli/cli.json'$(tput sgr 0) file and add new Runner if needed"
echo ""

while read -r script;
do
  if [[ $(jq ".value | type" <<< $script) = '"object"' ]]
  then
    name=$(jq -r ".key" <<< $script)
    description=$(jq -r ".value.description" <<< $script)

    if [[ $description != "null" ]]
    then
      echo "$(tput setaf 2) $name $(tput sgr 0)"
      echo "   - $description"
    fi
  fi
done <<< "$(jq -c '.scripts | to_entries[]' "$(dirname "$0")/../cli.json")"
