#!/usr/bin/env python3
"""Merge reports/allure-results/<browser>/ into a single Allure results directory.

Why is this step needed?
  The same scenario runs once on chrome, firefox and edge. Allure identifies "the same test"
  by historyId, so a naive merge would treat the three runs as retries and collapse them into
  one entry — a Firefox failure could be hidden behind a Chrome pass.
  This script adds a browser parameter to every result and recomputes historyId, so the report
  shows the three browsers side by side.

Usage: python3 scripts/merge_allure_results.py <results_root> <merged_dir>
"""
import hashlib
import json
import shutil
import sys
from pathlib import Path


def _tag(value: str, browser: str) -> str:
    return hashlib.md5(f"{value}|{browser}".encode()).hexdigest()


def merge(root: Path, out: Path) -> dict:
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)

    stats = {}
    browsers = sorted(p.name for p in root.iterdir() if p.is_dir()) if root.exists() else []
    for browser in browsers:
        count = 0
        for f in (root / browser).iterdir():
            if f.name.endswith("-result.json"):
                data = json.loads(f.read_text(encoding="utf-8"))
                data["name"] = f"{data.get('name', '')} [{browser}]"
                for key in ("historyId", "testCaseId"):
                    if data.get(key):
                        data[key] = _tag(data[key], browser)
                data.setdefault("parameters", []).append({"name": "browser", "value": browser})
                labels = data.setdefault("labels", [])
                labels.append({"name": "parentSuite", "value": browser})  # group by browser in the Suites view
                labels.append({"name": "tag", "value": browser})
                (out / f.name).write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
                count += 1
            elif f.is_file():  # container / attachment file names contain a uuid, so they never clash
                shutil.copy2(f, out / f.name)
        stats[browser] = count

    # The "Environment" widget on the report overview page
    (out / "environment.properties").write_text(
        "Browsers=" + ", ".join(browsers) + "\nGrid=Selenium Grid (Docker)\nFramework=behave + Page Object Model\n",
        encoding="utf-8",
    )
    return stats


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    result = merge(Path(sys.argv[1]), Path(sys.argv[2]))
    for b, n in result.items():
        print(f"  merged {n:>3} results from {b}")
    if not result:
        print("  no allure results found (did the test run start?)")
