#!/usr/bin/env python3

import subprocess
import shutil
import os
import difflib
import re

def process(line):
    return re.sub(r'\s', '', line)

shutil.rmtree('input', ignore_errors=True)
shutil.rmtree('output', ignore_errors=True)
shutil.rmtree('ref', ignore_errors=True)
shutil.copy('~/utek-2018-tests/input', 'input')
shutil.copy('~/utek-2018-tests/ref', 'ref')
os.mkdir('output')

# execute scripts
with open('output/stdout.txt', 'w') as stdout, open('output/stderr.txt', 'w') as stderr:
    subprocess.call('./run', stdout=stdout, stderr=stderr, timeout=5*60)

# diff against outputs to compute score
score = 0
for filename in os.listdir('ref'):
    with open(os.path.join('output',filename)) as out_file, open(os.path.join('ref', filename)) as ref_file:
        out_lines = out_file.readlines()
        ref_lines = ref_file.readlines()
        differ = difflib.SequenceMatcher(
                lambda x: x.strip() == '',  # ignore empty lines
                process(out_lines),
                process(ref_lines)
                )
        score += sum(m.size for m in differ.get_matching_blocks())
