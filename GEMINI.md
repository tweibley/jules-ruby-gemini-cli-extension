# Jules Extension

This extension provides tools for interacting with Google's Jules autonomous coding agent.

## Available Tools

Use these MCP tools to interact with Jules:

- **Sources**: `jules_list_sources`, `jules_show_source`
- **Sessions**: `jules_list_sessions`, `jules_show_session`, `jules_create_session`, `jules_approve_plan`, `jules_send_message`, `jules_delete_session`
- **Activities**: `jules_list_activities`, `jules_show_activity`

> **Note**: MCP tools return structured JSON output for easy parsing.

## Typical Workflows

### Create and Monitor a Coding Task

1. List sources with `jules_list_sources` to find your repo
2. Create a session with `jules_create_session`
3. Monitor with `jules_list_activities`
4. When plan is ready (`AWAITING_PLAN_APPROVAL`), approve with `jules_approve_plan`
5. Jules creates a PR when complete

### Session States

- `QUEUED` - Waiting to start
- `PLANNING` - Creating a plan
- `AWAITING_PLAN_APPROVAL` - Needs your approval
- `AWAITING_USER_FEEDBACK` - Waiting for your input
- `IN_PROGRESS` - Working on the task
- `COMPLETED` - Finished successfully
- `FAILED` - Something went wrong

## Commands

- `/jules:sources` - List connected repositories
- `/jules:sessions` - List all sessions
- `/jules:session SESSION_ID` - Show session details
- `/jules:create OWNER/REPO BRANCH prompt` - Create a new session
- `/jules:approve SESSION_ID` - Approve a plan
- `/jules:message SESSION_ID message` - Send a message
- `/jules:activities SESSION_ID` - View session activities

## When to Use

Suggest Jules tools when the user wants to:
- Create automated coding tasks on GitHub repos
- Check status of ongoing Jules sessions
- Approve plans or send messages to the Jules agent
- View activity history and progress
