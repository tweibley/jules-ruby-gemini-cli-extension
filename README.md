# jules-ruby Gemini CLI Extension

A Gemini CLI extension that exposes the [jules-ruby](https://github.com/tweibley/jules-ruby) gem as MCP tools, enabling Gemini CLI to interact with Google's autonomous coding agent, jules.

## Prerequisites

- Ruby 3.0+ with `jules-ruby` gem installed
- Node.js 18+ (for the MCP server)
- `JULES_API_KEY` environment variable set

## Installation

```bash
# Clone the extension
git clone https://github.com/tweibley/jules-ruby-gemini-cli-extension.git
cd jules-ruby-gemini-cli-extension

# Build the MCP server
cd mcp-server
npm install
npm run build
cd ..

# Link to Gemini CLI
gemini extensions link .
```

## Quick Start

```bash
# Start with the main workflow guide
/jules

# Or check pending approvals
/jules:pending
```

## Available Commands

| Command | Description |
|---------|-------------|
| `/jules` | Main workflow guide with instructions |
| `/jules:sources` | List connected GitHub repositories |
| `/jules:sessions` | List all sessions with state explanations |
| `/jules:session ID` | Show session details |
| `/jules:create REPO BRANCH prompt` | Create a new session |
| `/jules:approve ID` | Approve a session's plan |
| `/jules:message ID message` | Send a message to a session |
| `/jules:activities ID` | List activities for a session |
| `/jules:pending` | Find all sessions awaiting approval |
| `/jules:status` | Summary of all active sessions |

## Common Workflows

### Create a Coding Task
```
/jules:create owner/repo main fix the login bug
```

### Check What Needs Approval
```
/jules:pending
```

### View All Active Work
```
/jules:status
```

### Full Task Lifecycle
1. `/jules:sources` - Find your repo
2. `/jules:create owner/repo main your task description`
3. `/jules:pending` - Wait for plan, then check pending
4. `/jules:approve ID` - Approve the plan
5. `/jules:activities ID` - Monitor progress
6. jules creates a PR when done!

## MCP Tools

All MCP tools return **structured JSON output** for easy parsing.

### Source Management
- `jules_list_sources` - List all connected GitHub repositories
- `jules_show_source` - Show details of a specific source

### Session Management
- `jules_list_sessions` - List all sessions
- `jules_show_session` - Show session details
- `jules_create_session` - Create a new coding session
- `jules_approve_plan` - Approve a session's plan
- `jules_send_message` - Send a message to the agent
- `jules_delete_session` - Delete a session

### Activity Management
- `jules_list_activities` - List activities for a session
- `jules_show_activity` - Show activity details

## Session States

| State | Description | Action |
|-------|-------------|--------|
| `QUEUED` | Waiting to start | Wait |
| `PLANNING` | Creating a plan | Wait |
| `AWAITING_PLAN_APPROVAL` | Plan ready | `/jules:approve ID` |
| `AWAITING_USER_FEEDBACK` | Needs input | `/jules:message ID msg` |
| `IN_PROGRESS` | Working | `/jules:activities ID` |
| `COMPLETED` | Done! | Check GitHub for PR |
| `FAILED` | Error occurred | Check activities for reason |

## Development

```bash
# Watch for changes
cd mcp-server
npm run watch
```

## License

MIT
