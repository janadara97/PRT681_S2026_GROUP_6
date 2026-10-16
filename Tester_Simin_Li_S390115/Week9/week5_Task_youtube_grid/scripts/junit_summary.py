#!/usr/bin/env python3
"""Read reports/junit/<browser>/*.xml and print a Markdown summary table (written to the GitHub Job Summary).

Usage: python3 scripts/junit_summary.py <junit_root>   → prints Markdown to stdout
"""
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


def collect(root: Path):
    rows, failures = [], []
    for bdir in sorted(p for p in root.iterdir() if p.is_dir()) if root.exists() else []:
        t = f = e = s = 0
        for xml in bdir.glob("*.xml"):
            tree = ET.parse(xml).getroot()
            suites = [tree] if tree.tag == "testsuite" else tree.findall("testsuite")
            for suite in suites:
                for case in suite.findall("testcase"):
                    t += 1
                    if case.find("failure") is not None:
                        f += 1
                        failures.append((bdir.name, case.get("classname", ""), case.get("name", "")))
                    elif case.find("error") is not None:
                        e += 1
                        failures.append((bdir.name, case.get("classname", ""), case.get("name", "")))
                    elif case.find("skipped") is not None:
                        s += 1
        rows.append((bdir.name, t, t - f - e - s, f, e, s))
    return rows, failures


def main():
    rows, failures = collect(Path(sys.argv[1] if len(sys.argv) > 1 else "reports/junit"))
    print("## 🧪 Cross-browser BDD results\n")
    if not rows:
        print("_No JUnit results found — the suite probably failed before starting (check Grid logs)._")
        return
    print("| Browser | Total | ✅ Passed | ❌ Failed | 💥 Errors | ⏭ Skipped |")
    print("|---|---:|---:|---:|---:|---:|")
    for b, t, p, f, e, s in rows:
        print(f"| {'✅' if f + e == 0 else '❌'} {b} | {t} | {p} | {f} | {e} | {s} |")
    if failures:
        print("\n### Failed scenarios\n")
        for b, cls, name in failures:
            print(f"- **{b}** — `{cls}` › {name}")
    print("\nFull Allure report: see the **allure-report** artifact of this run.")


if __name__ == "__main__":
    main()
