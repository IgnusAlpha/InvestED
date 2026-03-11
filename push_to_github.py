import os
import subprocess

repo_url = 'https://github.com/IgnusAlpha/InvestED.git'
token = os.environ['GITHUB_TOKEN']
workspace = '/root/.openclaw/workspaces/invested_club'
os.chdir(workspace)

subprocess.run(['git', 'init'], check=False)
subprocess.run(['git', 'config', 'user.name', 'OpenClaw Bot'], check=True)
subprocess.run(['git', 'config', 'user.email', 'bot@openclaw.local'], check=True)
subprocess.run(['git', 'add', '.'], check=True)
subprocess.run(['git', 'commit', '-m', 'feat: build InvestED Club quiz website'], check=False)
subprocess.run(['git', 'branch', '-M', 'main'], check=True)

auth_url = repo_url.replace('https://', f'https://x-access-token:{token}@')
subprocess.run(['git', 'remote', 'remove', 'origin'], check=False)
subprocess.run(['git', 'remote', 'add', 'origin', auth_url], check=True)
subprocess.run(['git', 'push', '-u', 'origin', 'main', '--force'], check=True)

print('PUSH_OK')
