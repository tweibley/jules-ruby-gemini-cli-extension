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
/jules-ruby:pending
```

## Available Commands

| Command | Description |
|---------|-------------|
| `/jules-ruby` | Main workflow guide with instructions |
| `/jules-ruby:sources` | List connected GitHub repositories |
| `/jules-ruby:sessions` | List all sessions with state explanations |
| `/jules-ruby:session ID` | Show session details |
| `/jules-ruby:create REPO BRANCH prompt` | Create a new session |
| `/jules-ruby:approve ID` | Approve a session's plan |
| `/jules-ruby:message ID message` | Send a message to a session |
| `/jules-ruby:activities ID` | List activities for a session |
| `/jules-ruby:pending` | Find all sessions awaiting approval |
| `/jules-ruby:status` | Summary of all active sessions |

## Common Workflows

### Create a Coding Task
```
/jules-ruby:create owner/repo main fix the login bug
```

### Check What Needs Approval
```
/jules-ruby:pending
```

### View All Active Work
```
/jules-ruby:status
```

### Full Task Lifecycle
1. `/jules-ruby:sources` - Find your repo
2. `/jules-ruby:create owner/repo main your task description`
3. `/jules-ruby:pending` - Wait for plan, then check pending
4. `/jules-ruby:approve ID` - Approve the plan
5. `/jules-ruby:activities ID` - Monitor progress
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
| `AWAITING_PLAN_APPROVAL` | Plan ready | `/jules-ruby:approve ID` |
| `AWAITING_USER_FEEDBACK` | Needs input | `/jules-ruby:message ID msg` |
| `IN_PROGRESS` | Working | `/jules-ruby:activities ID` |
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
