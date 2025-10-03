# Testing Checklist - Meeting Intelligence Assistant

## Comprehensive Testing Guide

Use this checklist to verify all features work correctly before deployment.

---

## Pre-Deployment Testing

### 1. Functional Testing

#### Sample Meeting Test
- [ ] Click "Load Sample" button
- [ ] Verify sample meeting loads correctly
- [ ] Click "Analyze Meeting"
- [ ] Verify analysis completes successfully
- [ ] Check all 5 categories display results:
  - Key Decisions
  - Action Items (with owners and deadlines)
  - Open Questions
  - Risk Flags (with severity levels)
  - Next Steps

#### Empty Input Test
- [ ] Clear all text
- [ ] Click "Analyze Meeting"
- [ ] Verify error message: "Please enter meeting text to analyze"
- [ ] Button should be disabled when textarea is empty

#### Minimal Input Test
- [ ] Enter very short text (< 10 characters): "Hello"
- [ ] Click "Analyze Meeting"
- [ ] Verify appropriate error handling
- [ ] Test with ~50 characters
- [ ] Verify results are reasonable

#### Long Input Test
- [ ] Paste a very long transcript (5000+ characters)
- [ ] Character counter should show yellow warning color
- [ ] Click "Analyze Meeting"
- [ ] Verify analysis completes (may take 10-15 seconds)
- [ ] Check all results render properly

#### Clear Functionality
- [ ] Load sample meeting
- [ ] Click "Clear" button
- [ ] Verify textarea clears
- [ ] Verify results clear
- [ ] Clear button should be disabled when empty

#### Export Functionality Test
- [ ] Analyze a meeting (sample or custom)
- [ ] Click "Export Analysis" button
- [ ] Verify markdown file downloads
- [ ] File named `meeting-analysis-[timestamp].md`
- [ ] Open file and verify:
  - [ ] Proper markdown formatting
  - [ ] All 5 sections present
  - [ ] Action items with checkboxes `- [ ]`
  - [ ] Risk flags with emoji indicators
  - [ ] Timestamp in header
  - [ ] Attribution footer present

#### Doc Q&A Test
- [ ] Scroll to "Ask About Netflix Policies" section
- [ ] Click each of 6 questions:
  1. [ ] "How do I request a new laptop?"
  2. [ ] "What's the PTO policy?"
  3. [ ] "Who handles expense reimbursements?"
  4. [ ] "How do I book a conference room?"
  5. [ ] "What's the remote work policy?"
  6. [ ] "How do I submit a support ticket?"
- [ ] Verify each shows answer with source citation
- [ ] Verify clicking same question collapses answer
- [ ] Verify smooth expand/collapse animation

#### Metrics Dashboard Test
- [ ] Verify metrics visible on page load (demo data)
- [ ] Note initial counts
- [ ] Analyze a new meeting
- [ ] Verify "Meetings Analyzed" increments by 1
- [ ] Verify "Action Items Tracked" increases correctly
- [ ] Verify "Time Saved" recalculates
- [ ] Check all 3 metric cards display properly
- [ ] Verify hover effects work on cards

### 2. UI/UX Testing

#### Character Counter
- [ ] Starts at "0 chars" in gray
- [ ] Changes to green when > 500 chars
- [ ] Changes to yellow when > 5000 chars
- [ ] Counts correctly with special characters

#### Loading States
- [ ] Button shows "Analyzing..." with spinner during API call
- [ ] Button is disabled during analysis
- [ ] Other buttons remain functional
- [ ] No layout shift during loading

#### Results Display
- [ ] Overview cards show correct counts
- [ ] All sections are collapsible
- [ ] Hover effects work on cards
- [ ] Icons display correctly
- [ ] Color coding is consistent:
  - Decisions: Green
  - Actions: Blue
  - Questions: Orange
  - Risks: Red
  - Next Steps: Purple

#### Action Items Details
- [ ] Owner badges display correctly
- [ ] Deadline chips show when present
- [ ] Tasks display full text without truncation

#### Risk Flags
- [ ] Severity badges show correct colors:
  - High: Red
  - Medium: Yellow
  - Low: Blue
- [ ] Risk type and description display clearly

### 3. Error Handling

#### API Key Error
- [ ] Temporarily remove API key from .env.local
- [ ] Attempt analysis
- [ ] Verify error message displays: "API key not configured"
- [ ] Restore API key

#### Network Error Simulation
- [ ] Turn off internet connection
- [ ] Attempt analysis
- [ ] Verify error handling
- [ ] Re-enable internet

#### Invalid JSON Response
- [ ] Should be handled by fallback parsing
- [ ] No crashes or blank screens

### 4. Mobile Responsive Testing

#### Mobile Viewport (375px - iPhone SE)
- [ ] Header displays correctly
- [ ] Subtitle wraps properly
- [ ] Input section is usable
- [ ] Character counter + buttons stack vertically
- [ ] Textarea is appropriately sized
- [ ] Analyze button is full width
- [ ] Results cards display in 2 columns
- [ ] All text is readable
- [ ] No horizontal scrolling

#### Tablet Viewport (768px - iPad)
- [ ] Layout transitions smoothly
- [ ] Overview cards show in 3 columns
- [ ] Input section uses horizontal layout
- [ ] All spacing looks appropriate

#### Desktop Viewport (1920px)
- [ ] Content is centered with max-width
- [ ] Overview cards show in 5 columns
- [ ] Plenty of white space
- [ ] Text is not too wide

### 5. Browser Compatibility

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

Check:
- [ ] Fonts render correctly
- [ ] Colors display properly
- [ ] Animations work smoothly
- [ ] No console errors

### 6. Performance Testing

#### Load Time
- [ ] Initial page load < 2 seconds
- [ ] No layout shifts (CLS)
- [ ] Fonts load without FOIT

#### Bundle Size
- [ ] Run `npm run build`
- [ ] Check bundle sizes are reasonable
- [ ] First Load JS should be < 200kb

#### API Response Time
- [ ] Typical analysis: 5-10 seconds
- [ ] Long meetings: 10-15 seconds
- [ ] No timeouts

### 7. Accessibility Testing

- [ ] Tab through all interactive elements
- [ ] Focus states are visible
- [ ] Button labels are descriptive
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader can read content (test with built-in tools)

### 8. Edge Cases

#### Special Characters
- [ ] Test with emojis: 😀 🎉 ✅
- [ ] Test with markdown: **bold** _italic_
- [ ] Test with code: `function()`
- [ ] Test with URLs: https://example.com

#### Different Meeting Formats
- [ ] Formal meeting minutes
- [ ] Casual chat transcript
- [ ] Bullet point notes
- [ ] Timestamped transcript

#### Multiple Languages
- [ ] Test with non-English text (if supported)
- [ ] Verify encoding handles special characters

## Deployment Checklist

### Pre-Deploy
- [ ] All tests above pass
- [ ] No console errors
- [ ] No console warnings (critical ones)
- [ ] Environment variables documented
- [ ] .env.local is in .gitignore

### Vercel Deployment
- [ ] Add ANTHROPIC_API_KEY to Vercel environment variables
- [ ] Deploy to preview environment first
- [ ] Test preview deployment thoroughly
- [ ] Check API routes work in production
- [ ] Verify analytics/monitoring setup (if applicable)

### Post-Deploy
- [ ] Test production URL
- [ ] Verify API key works in production
- [ ] Test with multiple concurrent users (if possible)
- [ ] Monitor error logs
- [ ] Check response times

## Known Issues / Limitations

Document any known issues:
- Maximum transcript length: ~10,000 characters (API token limit)
- AI analysis quality depends on meeting clarity
- Requires JavaScript enabled
- Requires stable internet connection

## Test Data

### Short Meeting Example
```
Quick standup call:
- Mike: Finished the login feature
- Sarah: Working on dashboard, blocked by API
- Next: Sarah to pair with Mike on API tomorrow
```

### Medium Meeting Example
Use the sample meeting included in the app.

### Long Meeting Example
Concatenate the sample meeting 3-4 times or use a real long meeting transcript.

## Reporting Issues

If you find bugs during testing:
1. Note the browser and device
2. Describe steps to reproduce
3. Include screenshots if relevant
4. Check browser console for errors
5. Note expected vs actual behavior
