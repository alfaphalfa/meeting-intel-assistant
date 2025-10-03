export const SAMPLE_MEETING = `Meeting: Netflix Mobile App - Enhanced Personalization Feature
Date: October 2, 2024
Time: 2:00 PM - 3:00 PM PT
Attendees:
- Rachel Chen (Product Manager)
- Marcus Thompson (Engineering Lead)
- Priya Sharma (Data Science Lead)
- David Kim (UX Design)
- Elena Rodriguez (QA Lead)

---

Rachel: Thanks everyone for joining. We're here to finalize our Q4 plan for the enhanced personalization feature on mobile. This is critical for our OKRs around member engagement. Marcus, let's start with engineering - where are we on the technical foundation?

Marcus: We've completed the backend infrastructure for the new recommendation engine. The API is stable and we're seeing good performance in staging. However, we're hitting some challenges with the client-side implementation. The rendering performance on older Android devices is about 30% slower than our benchmarks.

Priya: On the ML side, our new model is showing a 15% improvement in click-through rates during A/B testing. We're confident in the quality, but we need to discuss the data pipeline. Right now, we're not capturing all the interaction events we need for the next iteration.

Rachel: That's great progress on the model, Priya. What specific events are we missing?

Priya: Primarily hover states and scroll depth on the browse page. Our current instrumentation doesn't capture those micro-interactions, which would really help us understand member intent better.

David: From a UX perspective, we've finalized the designs for the personalized homepage sections. I've shared the Figma files with engineering. The key change is the dynamic "Because you watched" rows with larger card sizes. We tested this with 12 members last week and the feedback was overwhelmingly positive.

Rachel: Excellent. Now, let's talk timeline. We originally planned to ship this on October 25th, but given the Android performance issues, I'm concerned about hitting that date. Marcus, what do you need to get the performance where it needs to be?

Marcus: We need at least two more weeks for optimization. The problem is we're loading too many assets upfront. We should implement progressive loading and image lazy-loading, but that's a non-trivial change. If we push to November 8th, I'm confident we can deliver a quality experience.

Elena: From QA, I'd also appreciate that buffer. We've only completed about 60% of our test cases, and we still need to do full regression testing across all supported devices. A November 8th launch gives us adequate time.

Rachel: Okay, I'm leaning toward November 8th, but I need to run this by leadership since it impacts our Q4 commitments. Let's plan for that date tentatively. Now, the elephant in the room - who's owning the data instrumentation work that Priya mentioned?

Marcus: That's a good question. That work spans engineering and data science. We haven't clearly defined ownership.

Rachel: This is critical - without that data, we can't improve the model for the next release. Priya, can you partner with Marcus to draft a spec? Let's have that ready by October 9th so we can assign resources properly.

Priya: Absolutely. I'll work with Marcus offline and we'll have something for review by end of next week.

David: One more thing - we still haven't made a decision on whether to include the "Not Interested" feedback option in this release. Marketing wanted it, but it adds scope.

Rachel: Let's descope that for now. We can include it in the December release. The core personalization is the priority.

Marcus: Agreed. That simplifies things for us.

Rachel: What about internationalization? Are we launching globally or starting with specific regions?

Marcus: Good question. We haven't decided that yet. We're technically ready for global, but I'd defer to product on the strategy.

Rachel: Let's start with US, Canada, UK, and Australia for the first two weeks, then expand globally on November 22nd if metrics look good. Elena, can you make sure our test coverage includes all those locales?

Elena: Yes, I'll prioritize those markets and add them to our test plan by October 11th.

Rachel: Perfect. Last topic - what are our rollback criteria if something goes wrong post-launch?

Marcus: We should define that. I'd propose if we see crash rates above 2% or if engagement drops more than 10% in the first 48 hours, we roll back immediately.

Rachel: Agreed. Let's document those thresholds. Marcus, can you own creating that runbook by October 15th?

Marcus: Will do.

Rachel: Alright, let me summarize our action items:
- Marcus: Optimize Android performance for November 8th launch
- Priya & Marcus: Data instrumentation spec by October 9th
- Elena: Test plan with priority locales by October 11th
- Marcus: Rollback runbook by October 15th
- Rachel: Get approval from leadership for the timeline change by October 4th

Anything else we need to cover?

David: Just a quick note - I'll need final sign-off on the designs by October 10th to give engineering enough lead time.

Rachel: Good call. I'll review and approve by then. Thanks everyone, great discussion.

---

Meeting adjourned at 2:58 PM`;
