#!/usr/bin/env python3
"""Check that translations use exactly the {{placeholders}} of en.json.

Usage: check-placeholders.py <base-ref> <file>...
Strings changed against <base-ref> fail the check; mismatches that already
existed on <base-ref> are reported as warnings.
"""
import json
import re
import subprocess
import sys
from collections import Counter

PLACEHOLDER = re.compile(r"\{\{\s*[\w.]+\s*\}\}")


def flatten(obj, prefix=""):
    for key, value in obj.items():
        if isinstance(value, dict):
            yield from flatten(value, f"{prefix}{key}.")
        else:
            yield f"{prefix}{key}", value


def placeholders(value):
    text = value if isinstance(value, str) else json.dumps(value, ensure_ascii=False)
    return Counter(m.replace(" ", "") for m in PLACEHOLDER.findall(text))


def load_base(ref, path):
    try:
        return json.loads(subprocess.run(["git", "show", f"{ref}:{path}"], capture_output=True, text=True, check=True).stdout)
    except (subprocess.CalledProcessError, json.JSONDecodeError):
        return {}


def line_of(lines, key):
    needle = json.dumps(key.split(".")[-1]) + ":"
    for number, line in enumerate(lines, 1):
        if line.strip().replace('" :', '":').startswith(needle):
            return number
    return 1


def main():
    base_ref, files = sys.argv[1], sys.argv[2:]
    english = dict(flatten(json.load(open("en.json", encoding="utf-8"))))
    errors = 0
    for path in files:
        with open(path, encoding="utf-8") as handle:
            text = handle.read()
        lines = text.splitlines()
        base = dict(flatten(load_base(base_ref, path)))
        for key, value in flatten(json.loads(text)):
            if key not in english:
                continue
            expected, actual = placeholders(english[key]), placeholders(value)
            if expected == actual:
                continue
            changed = base.get(key) != value
            level = "error" if changed else "warning"
            want = ", ".join(sorted(expected)) or "none"
            got = ", ".join(sorted(actual)) or "none"
            print(f"::{level} file={path},line={line_of(lines, key)}::{key}: placeholders must match en.json (expected {want}, found {got})")
            errors += changed
    if errors:
        print(f"{errors} changed string(s) use placeholders that differ from en.json.")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
