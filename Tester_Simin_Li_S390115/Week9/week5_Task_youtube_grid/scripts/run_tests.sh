#!/usr/bin/env bash
# Entrypoint of the test container: run behave, write Allure + JUnit results, and return behave's exit code unchanged
#   BROWSER   chrome | firefox | edge
#   TAGS      behave tag expression; empty = use default_tags from behave.ini
set -uo pipefail

BROWSER="${BROWSER:-chrome}"
TAGS="${TAGS:-}"
OUT="reports"

rm -rf "$OUT/allure-results/$BROWSER" "$OUT/junit/$BROWSER"
mkdir -p "$OUT/allure-results/$BROWSER" "$OUT/junit/$BROWSER" "$OUT/screenshots"

args=(
  --no-capture
  # Order matters: behave pairs each -o with the -f before it; a formatter without -o prints to the console
  -f allure_behave.formatter:AllureFormatter -o "$OUT/allure-results/$BROWSER"   # raw Allure results
  -f pretty                                                                       # readable console output
  --junit --junit-directory "$OUT/junit/$BROWSER"      # JUnit XML that CI platforms can parse natively
)
[[ -n "$TAGS" ]] && args+=(--tags "$TAGS")

echo "▶ behave on $BROWSER  (tags: ${TAGS:-<behave.ini default>})"
behave "${args[@]}"
status=$?

echo "◀ behave exit code for $BROWSER: $status"
exit $status   # non-zero → container exits non-zero → CI step fails → build fails
