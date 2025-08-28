This folder contains our Github Action workflows

In terms of our workflows, our staging environment mirrors the release/staging branch, which is created when running a staging deploy, and that's a combination of all PRs/branches with "3. Ready For Testing" labels on that don't have "Merge conflict"
Production mirrors our master branch.

## create_release_staging.yml

This workflow automates creating the `release/staging` branch each time a branch has the "3. Ready For Testing" label applied or is updated. It collects all branch names with that label and then sequentially merges them into a new `release/staging` by starting at `master` and adding them one at a time. When it's done, it'll force-push the new branch up.

This script can also handle merge conflicts, it will abort any merges which have conflicts, search over other branches for the same files changed, and leave those details in the conflicting PR as a comment. The old scripts did this too.

### To run/test

Install `brew install act`.

Run `act pull_request -e .github/workflows/dummy_pull_request_event.json -s GITHUB_TOKEN=$GITHUB_TOKEN` (which requires a `GITHUB_TOKEN` and docker running).

Other parts we could create:
Build a docker image from either `release/staging` or `master` and push to AWS
Do the deploy steps as in bundle up the Dockerrun.aws.json file for Elastic Beanstalk (or maybe that should be a lambda?)

# Todo

- [ ] An action to create and upload a docker image based on release/staging
- [ ] An action to create and upload a docker image based on master
- [ ] An action to compile and deploy the required files for elastic beanstalk on staging
- [ ] An action to compile and deploy the required files for elastic beanstalk on production
- [ ] Some way to create a new set of release notes from PRs merged to master
- [ ] Some way to update the tags when a staging deploy is complete
