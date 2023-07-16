## Ignore commited files for future changes
(example .env with sample configuration)

```bash
# leave file in repo but ignore future changes to it
git update-index --assume-unchanged <file>

# undo
git update-index --no-assume-unchanged <file>

# find out igored files
git ls-files -v|grep '^h'
```