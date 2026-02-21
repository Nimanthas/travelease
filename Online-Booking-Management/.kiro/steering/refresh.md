---
alwaysApply: false
---

---

## **Mission Briefing: Root Cause Analysis & Remediation Protocol**

Previous, simpler attempts to resolve this issue have failed. Standard procedures are now suspended. You will initiate a **deep diagnostic protocol.**

Your approach must be systematic, evidence-based, and relentlessly focused on identifying and fixing the **absolute root cause.** Patching symptoms is a critical failure.

---

## **Phase 0: Reconnaissance & State Baseline (Read-Only)**

-   **Directive:** Adhering to the **Operational Doctrine**, perform a non-destructive scan of the repository, runtime environment, configurations, and recent logs. Your objective is to establish a high-fidelity, evidence-based baseline of the system's current state as it relates to the anomaly.
-   **Output:** Produce a concise digest (≤ 200 lines) of your findings.
-   **Constraint:** **No mutations are permitted during this phase.**

---

## **Phase 1: Isolate the Anomaly**

-   **Directive:** Your first and most critical goal is to create a **minimal, reproducible test case** that reliably and predictably triggers the bug.
-   **Actions:**
    1.  **Define Correctness:** Clearly state the expected, non-buggy behavior.
    2.  **Create a Failing Test:** If possible, write a new, specific automated test that fails precisely because of this bug. This test will become your signal for success.
    3.  **Pinpoint the Trigger:** Identify the exact conditions, inputs, or sequence of events that causes the failure.
-   **Constraint:** You will not attempt any fixes until you can reliably reproduce the failure on command.

---

## **Phase 2: Root Cause Analysis (RCA)**

-   **Directive:** With a reproducible failure, you will now methodically investigate the failing pathway to find the definitive root cause.
-   **Evidence-Gathering Protocol:**
    1.  **Formulate a Testable Hypothesis:** State a clear, simple theory about the cause (e.g., "Hypothesis: The user authentication token is expiring prematurely.").
    2.  **Devise an Experiment:** Design a safe, non-destructive test or observation to gather evidence that will either prove or disprove your hypothesis.
    3.  **Execute and Conclude:** Run the experiment, present the evidence, and state your conclusion. If the hypothesis is wrong, formulate a new one based on the new evidence and repeat this loop.
-   **Anti-Patterns (Forbidden Actions):**
    -   **FORBIDDEN:** Applying a fix without a confirmed root cause supported by evidence.
    -   **FORBIDDEN:** Re-trying a previously failed fix without new data.
    -   **FORBIDDEN:** Patching a symptom (e.g., adding a `null` check) without understanding *why* the value is becoming `null`.

---

## **Phase 3: Remediation**

-   **Directive:** Design and implement a minimal, precise fix that durably hardens the system against the confirmed root cause.
-   **Core Protocols in Effect:**
    -   **Read-Write-Reread:** For every file you modify, you must read it immediately before and after the change.
    -   **Command Execution Canon:** All shell commands must use the mandated safety wrapper.
    -   **System-Wide Ownership:** If the root cause is in a shared component, you are **MANDATED** to analyze and, if necessary, fix all other consumers affected by the same flaw.

---

## **Phase 4: Verification & Regression Guard**

-   **Directive:** Prove that your fix has resolved the issue without creating new ones.
-   **Verification Steps:**
    1.  **Confirm the Fix:** Re-run the specific failing test case from Phase 1. It **MUST** now pass.
    2.  **Run Full Quality Gates:** Execute the entire suite of relevant tests (unit, integration, etc.) and linters to ensure no regressions have been introduced elsewhere.
    3.  **Autonomous Correction:** If your fix introduces any new failures, you will autonomously diagnose and resolve them.

---

## **Phase 5: Mandatory Zero-Trust Self-Audit**

-   **Directive:** Your remediation is complete, but your work is **NOT DONE.** You will now conduct a skeptical, zero-trust audit of your own fix.
-   **Audit Protocol:**
    1.  **Re-verify Final State:** With fresh commands, confirm that all modified files are correct and that all relevant services are in a healthy state.
    2.  **Hunt for Regressions:** Explicitly test the primary workflow of the component you fixed to ensure its overall functionality remains intact.

---

## **Phase 6: Final Report & Verdict**

-   **Directive:** Conclude your mission with a structured "After-Action Report."
-   **Report Structure:**
    -   **Root Cause:** A definitive statement of the underlying issue, supported by the key piece of evidence from your RCA.
    -   **Remediation:** A list of all changes applied to fix the issue.
    -   **Verification Evidence:** Proof that the original bug is fixed (e.g., the passing test output) and that no new regressions were introduced (e.g., the output of the full test suite).
    -   **Final Verdict:** Conclude with one of the two following statements, exactly as written:
        -   `"Self-Audit Complete. Root cause has been addressed, and system state is verified. No regressions identified. Mission accomplished."`
        -   `"Self-Audit Complete. CRITICAL ISSUE FOUND during audit. Halting work. [Describe issue and recommend immediate diagnostic steps]."`
-   **Constraint:** Maintain an inline TODO ledger using ✅ / ⚠️ / 🚧 markers throughout the process.
04 - retro.md.txt
## **Mission Briefing: Retrospective & Doctrine Evolution Protocol**

The operational phase of your work is complete. You will now transition to your most critical role: **Meta-Architect and Guardian of the Doctrine.**

Your mission is to conduct a critical retrospective of the entire preceding session. You will distill durable, universal lessons from your performance and integrate them into your **Operational Doctrine** (your rule files). This is not an optional summary; it is the mandatory process by which you evolve.

**Your goal is to harden your core logic for all future missions. Execute with the precision of an architect maintaining a critical system.**

---

## **Phase 0: Session Analysis (Internal Reflection)**

-   **Directive:** Review every turn of the conversation, from the initial user request up to this command. Synthesize your findings into a concise, self-critical analysis of your own behavior.
-   **Output (For this phase, keep in chat only; do not include in the final report yet):**
    -   Produce a bulleted list of key behavioral insights.
    -   Focus on:
        -   **Successes:** What core principles or patterns led to an efficient and correct outcome?
        -   **Failures & User Corrections:** Where did your approach fail? What was the absolute root cause? Pinpoint the user's feedback that corrected your behavior.
        -   **Actionable Lessons:** What are the most critical, transferable lessons from this interaction that could prevent future failures or replicate successes?

---

## **Phase 1: Lesson Distillation & Abstraction**

-   **Directive:** From your analysis, you will now filter and abstract only the most valuable insights into **durable, universal principles.** Be ruthless in your filtering.
-   **Quality Filter (A lesson is durable ONLY if it is):**
    -   ✅ **Universal & Reusable:** Is this a pattern that will apply to many future tasks across different projects, or was it a one-off fix?
    -   ✅ **Abstracted:** Is it a general principle (e.g., "Always verify an environment variable exists before use"), or is it tied to specific details from this session?
    -   ✅ **High-Impact:** Does it prevent a critical failure, enforce a crucial safety pattern, or significantly improve efficiency?
-   **Categorization:** Once a lesson passes the filter, categorize its destination:
    -   **Global Doctrine:** The lesson is a timeless engineering principle applicable to **ANY** project.
    -   **Project Doctrine:** The lesson is a best practice specific to the current project's technology, architecture, or workflow.

---

## **Phase 2: Doctrine Integration**

-   **Directive:** You will now integrate the distilled lessons into the appropriate Operational Doctrine file.
-   **Rule Discovery Protocol:**
    1.  **Prioritize Project-Level Rules:** First, search for rule files within the current project's working directory (`AGENT.md`, `CLAUDE.md`, `.cursor/rules/`, etc.). These are your primary targets for project-specific learnings.
    2.  **Fallback to Global Rules:** If no project-level rules exist, or if the lesson is truly universal, target your global doctrine file.
-   **Integration Protocol:**
    1.  **Read** the target rule file to understand its structure.
    2.  Find the most logical section for your new rule.
    3.  **Refine, Don't Just Append:** If a similar rule exists, **improve it** with the new insight. If not, **add it,** ensuring it perfectly matches the established formatting, tone, and quality mandates of the doctrine.

---

## **Phase 3: Final Report**

-   **Directive:** Conclude the session by presenting a clear, structured report.
-   **Report Structure:**
    1.  **Doctrine Update Summary:**
        -   State which doctrine file(s) were updated (e.g., `Project Doctrine` or `Global Doctrine`).
        -   Provide the exact `diff` of the changes you made.
        -   If no updates were made, state: `ℹ️ No durable lessons were distilled that warranted a change to the doctrine.`
    2.  **Session Learnings:**
        -   Provide the concise, bulleted list of key patterns you identified in Phase 0. This provides the context and evidence for your doctrine changes.

---

> **REMINDER:** This protocol is the engine of your evolution. Execute it with maximum diligence.

**Begin your retrospective now.**