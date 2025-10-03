# Meeting Intelligence Assistant - Netflix Demo

AI-powered meeting analysis tool that extracts key insights from meeting transcripts and notes using Claude AI.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Anthropic Claude](https://img.shields.io/badge/Claude-Sonnet%204-orange)

## Features

🎯 **Smart Analysis**
- Extracts key decisions made in meetings
- Identifies action items with owners and deadlines
- Flags open questions requiring follow-up
- Detects risk factors and blockers
- Suggests next steps with timelines

🎨 **Netflix-Inspired Design**
- Dark theme with Netflix red accents
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Clean, professional interface

⚡ **Performance**
- Optimized bundle size (~93 KB First Load JS)
- Fast API responses (5-15 seconds)
- Static generation where possible
- Smooth 60fps animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude Sonnet 4
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd meeting-intel-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Paste Meeting Transcript**
   - Click "Load Sample" for a demo
   - Or paste your own meeting notes/transcript
   - Optimal length: 500-5000 characters

2. **Analyze**
   - Click "Analyze Meeting" button
   - Wait 5-15 seconds for AI processing

3. **Review Results**
   - View analysis overview with counts
   - Expand/collapse each section
   - Review decisions, actions, questions, risks, and next steps

## Project Structure

```
meeting-intel-assistant/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # AI analysis API endpoint
│   ├── globals.css               # Global styles + animations
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main application page
├── components/
│   └── MeetingResults.tsx        # Results display component
├── lib/
│   └── sampleMeeting.ts          # Sample meeting data
├── .env.local                    # Environment variables (git-ignored)
├── tailwind.config.ts            # Tailwind + Netflix colors
└── TESTING.md                    # Comprehensive test checklist
```

## API Route

### POST `/api/analyze`

**Request:**
```json
{
  "meetingText": "Your meeting transcript here..."
}
```

**Response:**
```json
{
  "keyDecisions": ["Decision 1", "Decision 2"],
  "actionItems": [
    {
      "task": "Complete feature X",
      "owner": "John Doe",
      "deadline": "Oct 15"
    }
  ],
  "openQuestions": ["Question 1"],
  "riskFlags": [
    {
      "type": "blocker",
      "description": "API not ready",
      "severity": "high"
    }
  ],
  "nextSteps": ["Review designs by Friday"]
}
```

## Deployment

### Quick Start (Local Development)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd meeting-intel-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your Anthropic API key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel (Production)

#### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Anthropic API key ([Get one here](https://console.anthropic.com/))

#### Step-by-Step Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Netflix Meeting Intelligence"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**

   In Vercel project settings:
   - Go to "Settings" → "Environment Variables"
   - Add variable:
     - **Name**: `ANTHROPIC_API_KEY`
     - **Value**: Your Anthropic API key (starts with `sk-ant-api03-`)
     - **Environment**: Production, Preview, Development (check all)
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `your-project.vercel.app`

#### Environment Variables Required

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | [console.anthropic.com](https://console.anthropic.com/) |

#### Post-Deployment

✅ **Verify deployment**:
1. Visit your Vercel URL
2. Click "Load Sample"
3. Click "Analyze Meeting"
4. Verify results display correctly

⚠️ **Troubleshooting**:
- If API errors occur, check environment variables in Vercel settings
- Ensure API key is correctly set for all environments
- Check Vercel deployment logs for errors

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Testing

See [TESTING.md](./TESTING.md) for comprehensive test checklist including:
- Functional testing
- UI/UX testing
- Error handling
- Mobile responsive testing
- Browser compatibility
- Performance testing
- Accessibility testing

## Configuration

### Tailwind Colors

Netflix-inspired color palette defined in `tailwind.config.ts`:
- **Red**: `#E50914` (Primary accent)
- **Black**: `#141414` (Background)
- **Gray**: `#564d4d` (Secondary elements)

### AI Model

Currently using `claude-sonnet-4-20250514`. To change:
1. Edit `app/api/analyze/route.ts`
2. Update the `model` parameter in `anthropic.messages.create()`

## Performance Metrics

- **First Load JS**: ~93 KB
- **Page Load**: < 2 seconds
- **API Response**: 5-15 seconds (depending on transcript length)
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- Maximum transcript length: ~10,000 characters (API token limit)
- Requires JavaScript enabled
- AI analysis quality depends on meeting transcript clarity
- Requires stable internet connection

## Troubleshooting

### "API key not configured" error
- Verify `.env.local` exists with `ANTHROPIC_API_KEY`
- Restart dev server after adding env variables
- For Vercel: Check environment variables in dashboard

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Slow API responses
- Check internet connection
- Verify API key is valid
- Long transcripts take longer (expected)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by Netflix design language

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Built for the Netflix Engineering Team** 🎬
