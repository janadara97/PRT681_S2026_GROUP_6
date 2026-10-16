#!/usr/bin/env bash
# Local one-shot run: start the Grid → run all browsers IN PARALLEL → merge Allure results → aggregate exit codes
#
#   ./scripts/run_all.sh                          # chrome + firefox + edge
#   BROWSERS="chrome firefox" ./scripts/run_all.sh
#   TAGS=@smoke ./scripts/run_all.sh              # smoke tests only
#   KEEP_GRID=1 ./scripts/run_all.sh              # keep the Grid running afterwards (see http://localhost:4444/ui)
set -uo pipefail
cd "$(dirname "$0")/.."

BROWSERS="${BROWSERS:-chrome firefox edge}"
export TAGS="${TAGS:-}"

echo "== Building test image"
docker compose build tests || exit 1

echo "== Starting Selenium Grid: hub + $BROWSERS"
# shellcheck disable=SC2086
docker compose up -d selenium-hub $BROWSERS || exit 1

rm -rf reports && mkdir -p reports/logs

echo "== Running suites in parallel"
names=(); pids=()        # plain arrays on purpose: macOS ships bash 3.2, which has no `declare -A`
for b in $BROWSERS; do
  BROWSER="$b" docker compose run --rm -e BROWSER="$b" tests \
    > "reports/logs/$b.log" 2>&1 &
  names+=("$b"); pids+=($!)
done

overall=0
for i in "${!names[@]}"; do
  b="${names[$i]}"
  if wait "${pids[$i]}"; then
    echo "  ✅ $b passed"
  else
    echo "  ❌ $b FAILED  (see reports/logs/$b.log)"
    overall=1
  fi
done

echo "== Merging Allure results"
python3 scripts/merge_allure_results.py reports/allure-results reports/allure-merged
if command -v allure >/dev/null 2>&1; then
  allure generate reports/allure-merged -o reports/allure-report --clean >/dev/null \
    && echo "  Report: reports/allure-report/index.html   (open with: allure open reports/allure-report)"
else
  echo "  (allure CLI not installed — run: npx allure-commandline generate reports/allure-merged -o reports/allure-report --clean)"
fi

[[ -z "${KEEP_GRID:-}" ]] && docker compose down --remove-orphans >/dev/null

echo "== Overall: $([[ $overall -eq 0 ]] && echo PASS || echo FAIL)"
exit $overall
